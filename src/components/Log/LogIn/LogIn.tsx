'use client';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

export const LogIn = () => {

	const router = useRouter();

	const logIn = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (!formData) return;

		const email = formData.get('Email');
		const password = formData.get('Mdp');

		if (!email || !password) return;

		fetch(`/api/logIn`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email: String(email),
				password: String(password),
			}),
		})
			.then((data) => {
				if (data.ok) {
					router.refresh();
				} else {
					throw new Error(data.statusText);
				}
			})
			.catch(error => {
				toast.error('Mot de passe incorrect !');
			});
	};

	return (
		<form className='flex flex-col gap-2' onSubmit={logIn}>
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
				Se connecter
			</button>
		</form>
	);
};
