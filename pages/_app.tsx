import 'modern-normalize/modern-normalize.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

const inter = Inter()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
