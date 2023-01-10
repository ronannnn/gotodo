import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { resetServerContext } from "react-beautiful-dnd"

export default function App({ Component, pageProps }: AppProps) {
  resetServerContext();
  return (
    <div style={{ background: "#f5f5f5" }}>
      <Component {...pageProps} />
    </div>
  )
}
