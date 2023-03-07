'use client';

import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export const SignUp = () => {

	const router = useRouter();

	const signUp = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (!formData) return;

		const name = formData.get('Name');
		const email = formData.get('Email');
		const password = formData.get('Mdp');

		if (!email || !password) return;

    fetch(`/api/addUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
        name: String(name),
        email: String(email),
				password: String(password),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				router.refresh();
			});

	};

	return (
		<form className='flex flex-col gap-2' onSubmit={signUp}>
      <label htmlFor='Name'>Nom d'utilisateur</label>
			<input
				className='p-3 text-white placeholder-white bg-white rounded bg-opacity-10'
				type='text'
				name='Name'
				required={true}
			/>
			<label htmlFor='Email'>Email</label>
			<input
				className='p-3 text-white placeholder-white bg-white rounded bg-opacity-10'
				type='text'
				name='Email'
				required={true}
			/>
			<label className='mt-4' htmlFor='Mdp'>
				Mot de passe
			</label>
			<input
				className='p-3 text-white placeholder-white bg-white rounded bg-opacity-10'
				type='text'
				name='Mdp'
				required={true}
			/>
			<button
				className='w-auto p-3 mt-6 font-bold bg-blue-800 rounded'
				type='submit'>
				S'enregistrer
			</button>
		</form>
	);
};
