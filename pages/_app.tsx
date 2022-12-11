import 'modern-normalize/modern-normalize.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

const { className: typographyClassName } = Inter()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={typographyClassName}>
      <Component {...pageProps} />
    </main>
  )
}
