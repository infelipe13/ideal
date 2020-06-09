import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'lib/iron';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession(req);

    if (!session) {
      return res.status(200).json({ business: {} });
    }

    const { email } = session;
    const business =
      (await prisma.business.findOne({ where: { email } })) || {};

    res.status(200).json({ business });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
};
