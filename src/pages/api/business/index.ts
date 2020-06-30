import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'src/utils/auth';

const prisma = new PrismaClient();

export default async function handleReq(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession(req);

    if (!session) {
      res.writeHead(302, { Location: '/' });
      res.end();

      return;
    }

    const { email } = session;
    const business = await prisma.business.findOne({ where: { email } });

    res.status(200).json(business);
  } catch (error) {
    // TODO: Log error.

    res.status(500).json(error);
  }
}
