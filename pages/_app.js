import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from './../redux/store';

function MyApp({ Component, pageProps, ctx }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!store.getState().user.loggedIn && router.pathname !== '/') {
			document.location.href = '/';
		} else {
			setLoading(false);
		}
	}, []);
	return (
		<>
			{!loading ? (
				<>
					<Head>
						<title>Nettbanksimuleringen</title>
						<meta name="viewport" content="initial-scale=1.0, width=device-width" />
						<script src="//fast.fonts.net/jsapi/848aa82b-4971-40a6-a954-b55ee736c790.js"></script>
					</Head>
					<Provider store={store}>
						<Component {...pageProps} />
					</Provider>
				</>
			) : (
				<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-scree overflow-hidden bg-primary flex flex-col items-center justify-center">
					<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
				</div>
			)}
		</>
	);
}

export default MyApp;
