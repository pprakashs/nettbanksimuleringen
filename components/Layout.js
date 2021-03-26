import Header from './Header';
import { useRouter } from 'next/router';

const Layout = (props) => {
	const { pathname } = useRouter();
	// {`${pathname === 'account' ? 'min-h-screen flex flex-col justify-center py-[100px]' : 'pt-[120px] pb-[200px]'}`}
	return (
		<>
			<Header />
			<main className="py-[120px]">
				<div className="container max-w-[1215px]">{props.children}</div>
			</main>
		</>
	);
};

export default Layout;
