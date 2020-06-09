import { AppProps } from 'next/app';

import 'src/tailwind.css';

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
