import * as Sentry from '@sentry/browser';
import App, { AppContext, Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { ErrorInfo } from 'react';
import ReactDOM from 'react-dom';

import 'nprogress/nprogress.css';
import 'tailwind/index.css';

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
  beforeSend: (event) => {
    if (IS_CLIENT) {
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }

      return event;
    } else {
      return null;
    }
  },
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: IS_PRODUCTION,
});

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope((scope) => {
      (Object.keys(errorInfo) as Array<keyof typeof errorInfo>).forEach(
        (key) => {
          scope.setExtra(key, errorInfo[key]);
        }
      );

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
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
      </Container>
    );
  }
}
