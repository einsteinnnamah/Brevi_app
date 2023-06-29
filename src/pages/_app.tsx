import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {LinkProvider} from '../Context/LinkContext'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <LinkProvider>
    <Component {...pageProps} />
    </LinkProvider>
  )

  
}
