import { CacheModel } from '@/lib/mongo'
import type { JobType } from '@/lib/mongo/types/jobs'
import { Cron, scheduledJobs } from 'croner'

type JobConfig = {
  schedule: string
  jobName: string
  task: () => Promise<void | null>
}

export class JobManager {
  private static instance: JobManager | null = null

  private findJob(jobName: string): Cron | null {
    return scheduledJobs.find((job) => job.name === jobName) ?? null
  }

  public static getInstance(): JobManager {
    if (!JobManager.instance) {
      JobManager.instance = new JobManager()
    }
    return JobManager.instance
  }

  public async getSavedSchedule(jobType: JobType): Promise<string | null> {
    const jobSchedule = await CacheModel['JOB_SCHEDULE'].findOne({
      'data.jobType': jobType,
    })

    return jobSchedule?.data.schedule ?? null
  }

  public startJob({ jobName, schedule, task }: JobConfig): Cron {
    const job = this.findJob(jobName)

    if (!!job && job.isRunning()) {
      console.log(`Stopping job "${jobName}"`)
      job.stop()
    }

    console.log(`Starting job "${jobName}" with schedule "${schedule}"`)

    const cronJob = new Cron(
      schedule,
      {
        name: jobName,
        timezone: 'UTC',
        protect: true,
        maxRuns: Infinity,
        catch: (error) => {
          console.error(`Error in job "${jobName}":`, error)
        },
      },
      async () => {
        await task()
        console.log(`Job "${jobName}" triggered`)
      }
    )

    return cronJob
  }

  public pauseJob(jobName: string): void {
    const job = this.findJob(jobName)
    if (job && job.isRunning()) {
      job.pause()
      console.log(`Pausing job "${jobName}"`)
    } else {
      console.warn(`No running job found with name "${jobName}"`)
    }
  }

  public resumeJob(jobName: string): void {
    const job = this.findJob(jobName)
    if (job && !job.isRunning()) {
      job.resume()
      console.log(`Resuming job "${jobName}"`)
    } else {
      console.warn(`No paused job found with name "${jobName}"`)
    }
  }

  public stopJob(jobName: string): void {
    const job = this.findJob(jobName)

    if (job && job.isRunning()) {
      job.stop()
      console.log(`Job "${jobName}" stopped`)
    } else {
      console.warn(`No running job found with name "${jobName}"`)
    }
  }
}
