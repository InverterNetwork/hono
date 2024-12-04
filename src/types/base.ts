export type PaginationResult = {
  page: number
  limit: number
  totalPages: number
  totalCount: number
}

export type PrunedFile = {
  string: string
  type: string
  name: string
}
