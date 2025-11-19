import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, isAuthError } from '../utils/errorHandler'
import { useAlert } from '../contexts/alert/AlertContext'
import { useAuth } from '../contexts/auth/AuthContext'
import { tokenKey } from '../env'
import { local } from '../App'
import { setTokenToHeaders } from '../helpers/setTokenToHeaders'

interface UseErrorHandlerOptions {
  showAlert?: boolean
  redirectOnAuthError?: boolean
  onError?: (message: string) => void
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
  const { showAlert: showAlertFn } = useAlert()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const {
    showAlert = true,
    redirectOnAuthError = true,
    onError,
  } = options

  const handleErrorWithOptions = useCallback(
    (error: unknown, customMessage?: string) => {
      const message = customMessage || handleError(error)

      if (onError) {
        onError(message)
      }

      if (showAlert) {
        showAlertFn({
          text: message,
          severity: 'error',
        })
      }

      if (redirectOnAuthError && isAuthError(error)) {
        local.removeItem(tokenKey)
        setTokenToHeaders(undefined)
        logout()
        navigate('/login')
      }

      return message
    },
    [showAlert, redirectOnAuthError, onError, showAlertFn, logout, navigate]
  )

  return handleErrorWithOptions
}

