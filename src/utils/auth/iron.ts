import Iron from '@hapi/iron';
import { IncomingMessage } from 'http';
import { MagicUserMetadata } from 'magic-sdk';
import { NextApiRequest } from 'next';

import { getTokenCookie } from 'src/utils/auth';

const TOKEN_SECRET = process.env.TOKEN_SECRET!;

export const encryptSession = (session: MagicUserMetadata) => {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
};

export const getSession = async (
  req: IncomingMessage | NextApiRequest
): Promise<MagicUserMetadata> => {
  const tokenCookie = getTokenCookie(req);

  return tokenCookie && Iron.unseal(tokenCookie, TOKEN_SECRET, Iron.defaults);
};
