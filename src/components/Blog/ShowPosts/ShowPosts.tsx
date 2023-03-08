import { Post } from '@prisma/client';
import { prisma } from '~/src/db/prisma';
import { v4 as uuidv4 } from 'uuid';

export const ShowPosts: Function = async () => {
	const posts: Post[] = await prisma.post.findMany();

	return (
		<div className='flex flex-col w-full h-full gap-4 p-6 mt-5 text-white'>
			{posts.map((post) => (
				<div key={uuidv4()} className='flex flex-col h-auto gap-4 p-4 bg-white rounded bg-opacity-10'>
					<h1>{post.id}</h1>
					<h2 className='font-bold'>{post.title}</h2>
					<p className='max-w-xs'>{post.content}</p>
				</div>
			))}
		</div>
	);
};
