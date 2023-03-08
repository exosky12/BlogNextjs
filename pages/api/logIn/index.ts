import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '~/src/db/prisma';

const BodyScheme = z.object({
	email: z.string().min(1).max(255),
	password: z.string().min(1).max(255),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	const body = BodyScheme.parse(req.body);
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			email: body.email,
		},
		select: {
			id: true,
			email: true,
			password: true,
		},
	});
	if (user.password !== body.password || user.email !== body.email) {
		res.status(401).end();
		return;
	}

	res.status(200).json({ user });
}
