import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import ReactDOM from 'react-dom';

import 'nprogress/nprogress.css';

import 'tailwind/index.css';

const IS_CLIENT = typeof window !== 'undefined';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

if (IS_CLIENT && IS_DEVELOPMENT)
  import('react-axe').then((axe) => axe.default(React, ReactDOM, 1000));

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <style global jsx>{`
      @font-face {
        font-display: swap;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        src: url('/fonts/inter-latin-400.woff2') format('woff2');
      }

      @font-face {
        font-display: swap;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        src: url('/fonts/inter-latin-700.woff2') format('woff2');
      }
    `}</style>
  </>
);

export default CustomApp;
