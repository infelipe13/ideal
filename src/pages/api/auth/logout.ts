import { NextApiRequest, NextApiResponse } from 'next';

import { removeTokenCookie } from 'lib/authCookies';
import { getSession } from 'lib/iron';
import { magic } from 'lib/magic';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Unseal token cookie.
    const session = await getSession(req);
    // Sign out from Magic.
    await magic.users.logoutByIssuer(session.issuer!);
    // Remove token cookie.
    removeTokenCookie(res);
    // Redirect to sign in.
    res.writeHead(302, { Location: '/' });
    // Provide no response.
    res.end();
  } catch ({ message }) {
    res.status(500).send({ message });
  }
};
