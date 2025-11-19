import type { AxiosError } from 'axios'
import type { ApiError, ApiErrorResponse } from '../types/api.types'

const DEFAULT_ERROR_MESSAGE = 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.'

const NETWORK_ERROR_MESSAGE = 'Проблемы с подключением к интернету. Проверьте соединение.'

const TIMEOUT_ERROR_MESSAGE = 'Превышено время ожидания ответа от сервера.'

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error
  }

  if (error instanceof Error) {
    return error.message || DEFAULT_ERROR_MESSAGE
  }

  return DEFAULT_ERROR_MESSAGE
}

const getApiErrorMessage = (error: AxiosError<ApiErrorResponse>): string => {
  const response = error.response

  if (!response) {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return TIMEOUT_ERROR_MESSAGE
    }

    if (error.message.includes('Network Error') || !navigator.onLine) {
      return NETWORK_ERROR_MESSAGE
    }

    return DEFAULT_ERROR_MESSAGE
  }

  const { data, status } = response

  if (data?.message) {
    const messages = Array.isArray(data.message) ? data.message : [data.message]
    return messages.filter(Boolean).join(', ') || DEFAULT_ERROR_MESSAGE
  }

  switch (status) {
    case 400:
      return 'Некорректный запрос. Проверьте введенные данные.'
    case 401:
      return 'Необходима авторизация. Пожалуйста, войдите в систему.'
    case 403:
      return 'Доступ запрещен. У вас нет прав для выполнения этого действия.'
    case 404:
      return 'Запрашиваемый ресурс не найден.'
    case 409:
      return 'Конфликт данных. Возможно, запись уже существует.'
    case 422:
      return 'Ошибка валидации данных. Проверьте правильность заполнения полей.'
    case 429:
      return 'Слишком много запросов. Пожалуйста, подождите немного.'
    case 500:
      return 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.'
    case 502:
    case 503:
    case 504:
      return 'Сервер временно недоступен. Пожалуйста, попробуйте позже.'
    default:
      return DEFAULT_ERROR_MESSAGE
  }
}

export const handleError = (error: unknown): string => {
  if (!error) {
    return DEFAULT_ERROR_MESSAGE
  }

  const axiosError = error as ApiError

  if (axiosError.isAxiosError) {
    return getApiErrorMessage(axiosError)
  }

  return getErrorMessage(error)
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  )
}

export const getErrorStatus = (error: unknown): number | null => {
  if (isApiError(error) && error.response) {
    return error.response.status
  }

  return null
}

export const isNetworkError = (error: unknown): boolean => {
  if (isApiError(error)) {
    return !error.response || error.code === 'ECONNABORTED'
  }

  return false
}

export const isAuthError = (error: unknown): boolean => {
  const status = getErrorStatus(error)
  return status === 401 || status === 403
}

