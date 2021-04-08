import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HeaderSecondary = () => {
	const { pathname } = useRouter();
	useEffect(() => {
		const body = document.body;
		pathname === '/' ? body.classList.add('home-page') : body.classList.remove('home-page');
	}, []);
	return (
		<header className="bg-white py-4 absolute w-full top-0 left-0 h-[69px] flex items-center">
			<div className="container max-w-[1215px]">
				{pathname === '/' ? (
					<div>
						<img src={require('./../img/logo.svg')} alt="" />
					</div>
				) : (
					<Link href="/">
						<a className="flex font-anenirHeavy">
							<svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							<strong>Gå ut av simulator</strong>
						</a>
					</Link>
				)}
			</div>
		</header>
	);
};

export default HeaderSecondary;
