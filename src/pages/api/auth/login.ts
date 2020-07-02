import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { setTokenCookie } from 'src/utils/auth';
import { encryptSession } from 'src/utils/auth';
import { magic } from 'src/utils/auth';

const prisma = new PrismaClient();

const handleReq = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Remove "Bearer ".
    const didToken = req.headers.authorization!.substr(7);
    // Get session data.
    const session = await magic.users.getMetadataByToken(didToken);
    // Seal the session.
    const token = await encryptSession(session);
    // Set token cookie.
    setTokenCookie(res, token);
    // Destruct request.
    const { email } = req.body;
    // Upsert by e-mail.
    await prisma.business.upsert({
      create: { ...req.body },
      update: { ...req.body },
      where: { email },
    });
    // End the response.
    res.status(200).end();
  } catch (err) {
    res.status(500).json(err);

    throw err;
  }
};

export default handleReq;
