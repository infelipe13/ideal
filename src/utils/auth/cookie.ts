import { parse, serialize } from 'cookie';
import { IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const MAX_AGE = 8 * 60 * 60 * 1000; // 8h.
const TOKEN_NAME = 'token'; // TODO: Need better name.

function parseCookie(req: IncomingMessage | NextApiRequest) {
  // No need to parse cookie if req is coming from the client.
  if ((req as NextApiRequest).cookies) {
    return (req as NextApiRequest).cookies;
  }

  const { cookie = '' } = req.headers;

  return parse(cookie);
}

export function getTokenCookie(req: IncomingMessage | NextApiRequest) {
  const cookie = parseCookie(req);

  return cookie[TOKEN_NAME];
}

export function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, '', { maxAge: -1, path: '/' });

  res.setHeader('Set-Cookie', cookie);
}

export function setTokenCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    expires: new Date(Date.now() + MAX_AGE),
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: IS_PRODUCTION,
  });

  res.setHeader('Set-Cookie', cookie);
}
