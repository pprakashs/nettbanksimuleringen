import Header from './Header';

const Layout = (props) => {
	return (
		<>
			<Header />
			<main className="my-7">
				<div className="container">{props.children}</div>
			</main>
		</>
	);
};

export default Layout;
