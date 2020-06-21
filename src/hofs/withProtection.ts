import { GetServerSidePropsContext } from 'next';

import { getSession } from 'src/utils/auth';

// Watch discussion: https://github.com/vercel/next.js/discussions/11281
export const withProtection = (
  handleFn?: (ctx: GetServerSidePropsContext) => Promise<object>
) => async (ctx: GetServerSidePropsContext) => {
  const { req, res } = ctx;
  const session = await getSession(req);

  if (!session) {
    res.writeHead(302, { Location: '/' });
    res.end();

    return { props: {} };
  }

  const props = handleFn ? await handleFn(ctx) : {};

  return { props: { ...props, session } };
};
