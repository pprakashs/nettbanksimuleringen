const Header = () => {
	return (
		<header className="bg-white py-2">
			<div className="container flex items-center">
				<a href="#" className="flex font-anenirHeavy">
					<svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					<strong>Gå ut av simulator</strong>
				</a>
				<nav className="ml-auto">
					<ul className="flex">
						<li className="ml-4">
							<a className="bg-primary pl-4 pr-3 text-sm rounded text-white flex items-center font-anenirHeavy" href="#">
								Dagligbank
								<span className="border-l border-white ml-3 pl-2 py-2">
									<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</span>
							</a>
						</li>
						<li className="bg-gray-200 py-2 px-4 text-sm rounded ml-4">Pensjon og forsikring</li>
						<li className="bg-gray-200 py-2 px-4 text-sm rounded ml-4">Sparing og investering</li>
						<li className="bg-gray-200 py-2 px-4 text-sm rounded ml-4">Lan</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
