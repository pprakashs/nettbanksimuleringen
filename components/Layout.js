import Header from './Header';
import { useRouter } from 'next/router';

const Layout = (props) => {
	const { pathname } = useRouter();
	return (
		<>
			<Header />
			<main className="py-[120px]">
				<div className="container max-w-[1215px]">
					<section className="bg-white px-7 shadow-md">{props.children}</section>
				</div>
			</main>
		</>
	);
};

export default Layout;
