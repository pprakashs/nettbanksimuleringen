import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const { pathname } = useRouter();
	useEffect(() => {
		const script = document.createElement('script');
		script.src = '//fast.fonts.net/jsapi/848aa82b-4971-40a6-a954-b55ee736c790.js';
		document.getElementsByTagName('head')[0].appendChild(script);

		const body = document.body;
		if (pathname === '/') {
			body.classList.add('home-page');
		} else {
			body.classList.add(pathname.split('/')[1] + '-page');
		}
	}, []);
	return (
		<>
			<Head>
				<title>Nettbanksimuleringen</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
