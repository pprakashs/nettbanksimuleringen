import { useEffect } from 'react';
import Header from './Header';
import tooltip from './../util/tooltip';

const Layout = (props) => {
	useEffect(() => {
		tooltip();
	}, []);

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
