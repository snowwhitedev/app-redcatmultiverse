import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../src/components/Layout'
import '../src/styles/globals.scss'
import { useEagerConnect } from '../src/hooks/useEagerConnect'
import { useInactiveListener } from '../src/hooks/useInactiveListener'
import Providers from '../src/Providers'


function MyApp({ Component, pageProps }: AppProps) {
  // useEagerConnect();
  // useInactiveListener();

  return (
    <>
      <Head>
        <title>RCM Inception Package Minting Phase 1</title>
      </Head>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  )
}

export default MyApp;
