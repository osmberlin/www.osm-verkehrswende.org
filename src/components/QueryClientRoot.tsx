import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

/**
 * Per-island QueryClient for Astro static pages.
 *
 * Astro React islands are separate trees, so there is no app-wide provider in
 * Layout.astro. Each island that uses useQuery needs a Provider at its root.
 *
 * Create the client in useState (not module scope) so `client:load` SSR/SSG
 * does not share one client across pages during the build.
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  })
}

type Props = {
  children: ReactNode
}

export function QueryClientRoot({ children }: Props) {
  const [queryClient] = useState(createQueryClient)
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
