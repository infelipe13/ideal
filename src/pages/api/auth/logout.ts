import { NextApiRequest, NextApiResponse } from 'next';

import { removeTokenCookie } from 'src/utils/auth';
import { getSession } from 'src/utils/auth';
import { magic } from 'src/utils/auth';

export default async function handleReq(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Unseal token cookie.
    const session = await getSession(req);
    // Sign out from Magic.
    await magic.users.logoutByIssuer(session.issuer!);
    // Remove token cookie.
    removeTokenCookie(res);
    // Provide no response.
    res.status(200).end();
  } catch ({ message }) {
    res.status(500).send({ message });
  }
}
