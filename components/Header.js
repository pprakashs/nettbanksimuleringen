import Link from 'next/link';
import { dropdown } from './../util/dropdown';

const Header = () => {
	const dropdownHandle = (e) => {
		dropdown(e.currentTarget.parentNode);
	};

	return (
		<header className="bg-white py-2 h-[69px] flex flex-col justify-center absolute w-full left-0 top-0">
			<div className="container flex items-center max-w-[1215px]">
				<Link href="/">
					<a className="flex font-anenirHeavy">
						<svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						<strong>Gå ut av simulator</strong>
					</a>
				</Link>
				<nav className="ml-auto">
					<ul className="flex items-center">
						<li className="mr-3">
							<Link href="/konto">
								<a href="#" className="text-primary font-anenirHeavy text-sm flex items-center">
									<img src={require('./../img/home.svg')} className="relative -top-1" alt="" />
									<span className="ml-3">Startsiden</span>
								</a>
							</Link>
						</li>
						<li className="ml-4 relative">
							<button
								className="bg-primary pl-4 pr-3 text-sm rounded text-white flex items-center font-anenirHeavy focus:outline-none has-dropdown"
								onClick={dropdownHandle}
							>
								Dagligbank
								<span className="border-l border-white ml-3 pl-2 py-2 pointer-events-none">
									<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</span>
							</button>
							<div className="nav__dropdown dropdown bg-[#B3B3B4] rounded-[15px] p-[4px] absolute top-full mt-2 left-0 w-[276px] z-50 transition opacity-0 duration-300 hidden">
								<i className="block arrow-top absolute -top-5 right-[139px]"></i>
								<div className="bg-white rounded-[10px] overflow-hidden">
									<ul>
										<li>
											<Link href="/oversikt">
												<a className="block px-3 py-2 text-base hover:bg-pink transition">Mine transaksjoner</a>
											</Link>
										</li>
										<li>
											<Link href="/betaling">
												<a className="block px-3 py-2 text-base hover:bg-pink transition">Ny betaling</a>
											</Link>
										</li>
										<li>
											<Link href="/overfore">
												<a className="block px-3 py-2 text-base hover:bg-pink transition">Overføre egne kontoer</a>
											</Link>
										</li>
										<li>
											<Link href="/avtalegiro">
												<a className="block px-3 py-2 text-base hover:bg-pink transition">Avtalegiro</a>
											</Link>
										</li>
										<li>
											<Link href="/aktiver-bankid">
												<a className="block px-3 py-2 text-base hover:bg-pink transition">Aktiver BankID på mobil</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</li>
						<li
							className="bg-gray-200 py-2 px-4 text-sm rounded ml-4 tooltip cursor-pointer"
							data-tooltip-text="Denne funksjonen er dessverre ikke aktiv i nettbanksimuleringen."
						>
							Pensjon og forsikring
						</li>
						<li
							className="bg-gray-200 py-2 px-4 text-sm rounded ml-4 tooltip cursor-pointer"
							data-tooltip-text="Denne funksjonen er dessverre ikke aktiv i nettbanksimuleringen."
						>
							Sparing og investering
						</li>
						<li
							className="bg-gray-200 py-2 px-4 text-sm rounded ml-4 tooltip cursor-pointer"
							data-tooltip-text="Denne funksjonen er dessverre ikke aktiv i nettbanksimuleringen."
						>
							Lån
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
