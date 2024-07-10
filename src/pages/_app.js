import '@/styles/globals.css'
import Footer from '@/components/Footer'
import { ProSidebarProvider } from 'react-pro-sidebar'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import AuthLayout from '@/components/layouts/AuthLayout'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { GoogleOAuthProvider } from '@react-oauth/google'

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

import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'verdana', 'sans-serif'].join(','),
  },
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.google_client_id}>
        <ProSidebarProvider>
          <QueryClientProvider client={queryClient}>
            <AuthLayout>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
              <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                // limit={5}
              />
            </AuthLayout>
          </QueryClientProvider>
          {/* <Footer /> */}
        </ProSidebarProvider>
      </GoogleOAuthProvider>
    </>
  )
}
