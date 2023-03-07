import { NewPost } from '../components/Blog/NewPost/NewPost';
import { ShowPosts } from '../components/Blog/ShowPosts/ShowPosts';

export default function Home() {
	return (
		<div className='w-full h-full p-6 text-white'>
			<h1 className='text-2xl text-white'>Mon blog</h1>
			<NewPost />
			<ShowPosts />
		</div>
	);
}
