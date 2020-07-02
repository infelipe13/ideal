import { NextApiRequest, NextApiResponse } from 'next';

import { removeTokenCookie } from 'src/utils/auth';
import { getSession } from 'src/utils/auth';
import { magic } from 'src/utils/auth';

const handleReq = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Unseal token cookie.
    const session = await getSession(req);
    // Sign out from Magic.
    await magic.users.logoutByIssuer(session.issuer!);
    // Remove token cookie.
    removeTokenCookie(res);
    // Provide no response.
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);

    throw error;
  }
};

export default handleReq;
