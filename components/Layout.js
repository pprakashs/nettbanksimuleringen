import Header from './Header';
import { useRouter } from 'next/router';

const Layout = (props) => {
	const { pathname } = useRouter();
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
