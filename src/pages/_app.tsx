import { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/globalStyle'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>

    <Component {...pageProps} />
    <GlobalStyle />
    </QueryClientProvider>
    </>
  )
}

export default MyApp
