import { useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Nettbanksimuleringen</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<script src="//fast.fonts.net/jsapi/848aa82b-4971-40a6-a954-b55ee736c790.js"></script>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
