// import { showReportDialog } from '@sentry/browser';
import * as Sentry from '@sentry/node';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import ReactDOM from 'react-dom';

import 'nprogress/nprogress.css';
import 'tailwind/index.css';

type Props = AppProps & {
  err?: Error & {
    statusCode?: number;
  };
};

const IS_CLIENT = typeof window !== 'undefined';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

if (IS_CLIENT && !IS_PRODUCTION) {
  import('react-axe').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);
Router.events.on('routeChangeStart', NProgress.start);

Sentry.init({
  // beforeSend: (event) => {
  //   if (IS_CLIENT && event.exception) {
  //     showReportDialog({ eventId: event.event_id });
  //   }

  //   return event;
  // },
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: IS_PRODUCTION,
});

export default function CustomApp({ Component, err, pageProps }: Props) {
  return (
    <>
      <Component {...pageProps} err={err} />
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
}
