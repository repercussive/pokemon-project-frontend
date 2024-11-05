import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  }
})

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(component, { wrapper: Providers, ...options }) 

export * from '@testing-library/react'
export * from '@testing-library/jest-dom/vitest'
export { customRender as render }