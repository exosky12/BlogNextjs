import { Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '~/src/db/prisma';

type Data = {
	post: Post;
};

const BodyScheme = z.object({
	id: z.number().min(1).max(255),
	title: z.string().min(1).max(255),
	content: z.string().min(1).max(255),
	authorId: z.number().min(1).max(255),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	const body = BodyScheme.parse(JSON.parse(req.body));
	const post = await prisma.post.create({
		data: {
			id: body.id,
			title: body.title,
			content: body.content,
			authorId: body.authorId,
		},
	});
	res.status(201).json({ post });
}
