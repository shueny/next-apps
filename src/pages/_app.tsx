
import type { ReactElement, ReactNode } from 'react'
import Head from 'next/head';
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'


 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
 
  return getLayout(<><Head>
    <link rel="icon" href="../aseets/favicon.ico" />
    {/* 你可以添加其他 meta 標籤或樣式 */}
  </Head><Component {...pageProps} /></>)
}