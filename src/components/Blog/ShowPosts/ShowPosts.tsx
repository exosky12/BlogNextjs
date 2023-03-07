import { prisma } from '~/src/db/prisma';

export const ShowPosts = async () => {
	const posts = await prisma.post.findMany();

	return (
		<div className='flex flex-col w-full h-full gap-4 p-6 mt-5 text-white'>
			{posts.map((post) => (
				<div className='flex flex-col gap-4 p-4 bg-white rounded bg-opacity-10'>
          <h1>{post.id}</h1>
					<h2 className='font-bold'>{post.title}</h2>
          <p>{post.content}</p>
				</div>
			))}
		</div>
	);
};
