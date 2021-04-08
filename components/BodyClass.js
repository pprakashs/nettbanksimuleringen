import { useEffect } from 'react';
import { useRouter } from 'next/router';

const BodyClass = () => {
	const { pathname } = useRouter();
	useEffect(() => {
		const body = document.body;
		pathname === '/' ? body.classList.add('home-page') : body.classList.remove('home-page');
	}, []);
	return '';
};

export default BodyClass;
