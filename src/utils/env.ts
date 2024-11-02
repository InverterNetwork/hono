const getEnvValue = <T>(
  envKey: string,
  awsSecretKey: string,
  errorMessage: string,
  parser: (value: string) => T = (value) => value as T
): T => {
  let value: T | undefined

  if (process.env[envKey]) {
    value = parser(process.env[envKey] as string)
  }

  if (process.env.AWS_SECRET) {
    const awsSecret = JSON.parse(process.env.AWS_SECRET)
    value = parser(awsSecret[awsSecretKey])
  }

  if (value === undefined) throw new Error(errorMessage)

  return value
}

export const mongoUri = (): string =>
  getEnvValue('MONGO_URI', 'MONGO_URI', 'Mongo URI not found')
