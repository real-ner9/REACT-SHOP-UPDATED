import React, { type ReactNode, useMemo } from 'react'

interface ProviderComposerProps {
  providers: Array<React.ComponentType<{ children: ReactNode }>>
  children: ReactNode
}

/**
 * Composes multiple providers into a single component to avoid deep nesting
 */
export const ProvidersComposer: React.FC<ProviderComposerProps> = ({ providers, children }) => {
  const ComposedProviders = useMemo(() => {
    return providers.reduceRight(
      (AccumulatedProviders, CurrentProvider) => {
        return ({ children }: { children: ReactNode }) => (
          <CurrentProvider>
            <AccumulatedProviders>{children}</AccumulatedProviders>
          </CurrentProvider>
        )
      },
      ({ children }: { children: ReactNode }) => <>{children}</>
    )
  }, [providers])

  return <ComposedProviders>{children}</ComposedProviders>
}

