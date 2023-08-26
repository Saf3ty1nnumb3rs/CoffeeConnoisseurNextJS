import ShopProvider from '@/shop/shopContext';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShopProvider>
      <Component {...pageProps} />
    </ShopProvider>
  );
}
