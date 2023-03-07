import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '~/src/db/prisma';

type Data = {
	user: User;
};

const BodyScheme = z.object({
	id: z.number(),
	email: z.string().min(1).max(255),
	name: z.string().min(1).max(255),
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
			id: body.id,
			email: body.email,
			password: body.password,
			name: body.name,
		},
	});
	res.status(201).json({ user });
}
