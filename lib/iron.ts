import Iron from '@hapi/iron';
import { MagicUserMetadata } from 'magic-sdk';
import { NextApiRequest } from 'next';

import { getTokenCookie } from 'lib/authCookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET!;

export const encryptSession = (session: MagicUserMetadata) => {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
};

export const getSession = async (
  request: NextApiRequest
): Promise<MagicUserMetadata> => {
  const tokenCookie = getTokenCookie(request);

  return tokenCookie && Iron.unseal(tokenCookie, TOKEN_SECRET, Iron.defaults);
};
