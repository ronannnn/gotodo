import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { resetServerContext } from "react-beautiful-dnd"

export default function App({ Component, pageProps }: AppProps) {
  resetServerContext();
  return <Component {...pageProps} />
}
