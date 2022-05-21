import '../styles/globals.scss'
import "slick-carousel/slick/slick.scss"
import "slick-carousel/slick/slick-theme.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';


import {
    QueryClientProvider, QueryClient
} from 'react-query'

/*------Components-----*/
import Layout from '../components/Layout/Layout'

const queryClient  = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </QueryClientProvider>
  )
}

export default (appWithTranslation(MyApp))
