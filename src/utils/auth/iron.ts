import Iron from '@hapi/iron';
import { IncomingMessage } from 'http';
import { MagicUserMetadata } from 'magic-sdk';
import { NextApiRequest } from 'next';

import { getTokenCookie } from 'src/utils/auth';

const TOKEN_SECRET = process.env.TOKEN_SECRET!;

if (!TOKEN_SECRET) {
  // TODO: Log error.
}

export async function encryptSession(session: MagicUserMetadata) {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
}

export async function getSession(
  req: IncomingMessage | NextApiRequest
): Promise<MagicUserMetadata> {
  const tokenCookie = getTokenCookie(req);

  return tokenCookie && Iron.unseal(tokenCookie, TOKEN_SECRET, Iron.defaults);
}
