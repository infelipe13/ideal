import { AppProps } from 'next/app';

import 'src/tailwind/index.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
