import '@/styles/globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { ProSidebarProvider } from 'react-pro-sidebar'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import AuthLayout from '@/components/layouts/authLayout'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      refetchInterval: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProSidebarProvider>
        <QueryClientProvider client={queryClient}>
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        </QueryClientProvider>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}
