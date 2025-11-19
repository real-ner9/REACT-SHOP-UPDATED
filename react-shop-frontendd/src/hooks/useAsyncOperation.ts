import { useState, useCallback, type DependencyList } from 'react'
import { useErrorHandler } from './useErrorHandler'

interface UseAsyncOperationOptions {
  onSuccess?: () => void
  onError?: (error: unknown) => void
  showErrorAlert?: boolean
}

export const useAsyncOperation = <T extends unknown[]>(
  operation: (...args: T) => Promise<unknown>,
  options: UseAsyncOperationOptions = {}
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleError = useErrorHandler({
    showAlert: options.showErrorAlert ?? true,
  })

  const execute = useCallback(
    async (...args: T): Promise<void> => {
      setLoading(true)
      setError(null)

      try {
        await operation(...args)
        options.onSuccess?.()
      } catch (err) {
        const errorMessage = handleError(err)
        setError(errorMessage)
        options.onError?.(err)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operation, options.onSuccess, options.onError, handleError]
  )

  return {
    execute,
    loading,
    error,
  }
}

export const useAsyncOperationWithDeps = <T extends unknown[]>(
  operation: (...args: T) => Promise<unknown>,
  deps: DependencyList,
  options: UseAsyncOperationOptions = {}
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleError = useErrorHandler({
    showAlert: options.showErrorAlert ?? true,
  })

  const execute = useCallback(
    async (...args: T): Promise<void> => {
      setLoading(true)
      setError(null)

      try {
        await operation(...args)
        options.onSuccess?.()
      } catch (err) {
        const errorMessage = handleError(err)
        setError(errorMessage)
        options.onError?.(err)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operation, ...deps, options.onSuccess, options.onError, handleError]
  )

  return {
    execute,
    loading,
    error,
  }
}

