import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { setTokenCookie } from 'lib/authCookies';
import { encryptSession } from 'lib/iron';
import { magic } from 'lib/magic';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Remove "Bearer ".
    const didToken = req.headers.authorization!.substr(7);
    // Get session data.
    const session = await magic.users.getMetadataByToken(didToken);
    // Seal the session.
    const token = await encryptSession(session);
    // Set token cookie.
    setTokenCookie(res, token);

    const { email } = req.body;
    const business = await prisma.business.upsert({
      where: { email },
      update: { ...req.body },
      create: { ...req.body },
    });

    res.status(200).send({ business });
  } catch ({ message }) {
    res.status(500).end({ message });
  }
};
