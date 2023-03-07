'use client';

import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'

export const AddBlog = () => {
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		if (!formData) return;

		const postTitle = formData.get('Title');
		const postContent = formData.get('Content');

		if (!postTitle || !postContent) return;

		fetch(`/api/post`, {
			method: 'POST',
			body: JSON.stringify({
				id: uuidv4(),
				title: postTitle,
				content: postContent,
				authorId: 2,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				router.refresh();
			});
	};

	return (
		<div className='w-full h-full p-6 text-white'>
			<form className='flex flex-col gap-2' onSubmit={handleSubmit}>
				<label htmlFor='Title'>Titre de l'article</label>
				<input
					className='p-3 text-white placeholder-white bg-white rounded bg-opacity-10'
					type='text'
					name='Title'
					required={true}
				/>
				<label className='mt-4' htmlFor='Content'>
					Contenu de l'article
				</label>
				<input
					className='p-3 text-white placeholder-white bg-white rounded bg-opacity-10'
					type='text'
					name='Content'
					required={true}
				/>
				<button
					className='w-auto p-3 mt-6 font-bold bg-blue-800 rounded'
					type='submit'>
					Publier l'article
				</button>
			</form>
		</div>
	);
};
