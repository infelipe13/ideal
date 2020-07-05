import NextErrorComponent from 'next/error';
import * as Sentry from '@sentry/node';

// eslint-disable-next-line react/prop-types
const CustomError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

CustomError.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }

  if (err) {
    Sentry.captureException(err);

    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return errorInitialProps;
};

export default CustomError;
