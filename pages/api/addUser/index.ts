import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '~/src/db/prisma';

type Data = {
	user: User;
};

const BodyScheme = z.object({
	name: z.string().min(1).max(255),
	email: z.string().min(1).max(255),
	password: z.string().min(1).max(255),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	const body = BodyScheme.parse(req.body);
	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
			password: body.password,
		},
	});
	res.status(201).json({ user });
}
