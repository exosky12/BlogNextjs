import { LogIn } from "~/src/components/Log/LogIn/LogIn";
import { SignUp } from "~/src/components/Log/SignUp/SignUp";

export default function page() {
	
	return (
		<div className='flex flex-col w-full h-full gap-10 p-6 text-white'>
			<SignUp />
			<LogIn />
		</div>
	);
}
