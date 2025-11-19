import type { AxiosError } from 'axios'

export interface ApiErrorResponse {
  message: string[]
  statusCode: number
  error?: string
}

export interface ApiSuccessResponse<T = unknown> {
  data: T
  message?: string
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T>

export type ApiError = AxiosError<ApiErrorResponse>

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface PaginationLinks {
  first?: string
  last?: string
  next?: string
  previous?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
  links: PaginationLinks
}

