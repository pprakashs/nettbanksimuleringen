import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const AutomaticPayment = () => {
	const [popup, setPopup] = useState(false);
	const submitHandle = (e) => {
		e.preventDefault();
		setPopup(!popup);
	};
	return (
		<Layout>
			<div className="py-10">
				<h1 className="mb-5">Avtalegiro</h1>

				<h2 className="text-2xl font-avenir pb-2">Dine avtaler</h2>
				<ul className="border-b border-gray-200 pb-3 mb-8">
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Forsikring</span>
						<button className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline" onClick={submitHandle}>
							Avslutt avtale
						</button>
					</li>
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Strøm</span>
						<button className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline" onClick={submitHandle}>
							Avslutt avtale
						</button>
					</li>
				</ul>
				{/* for the suggestion*/}
				<h2 className="text-2xl font-avenir pb-2">Forslag til avtaler</h2>
				<ul>
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Forsikring</span>
						<Link href="/opprett-avtalegiro">
							<a className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline">Opprett avtale</a>
						</Link>
					</li>
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Strøm</span>
						<Link href="/opprett-avtalegiro">
							<a className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline">Opprett avtale</a>
						</Link>
					</li>
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Strøm</span>
						<Link href="/opprett-avtalegiro">
							<a className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline">Opprett avtale</a>
						</Link>
					</li>
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Strøm</span>
						<Link href="/opprett-avtalegiro">
							<a className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline">Opprett avtale</a>
						</Link>
					</li>
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Strøm</span>
						<Link href="/opprett-avtalegiro">
							<a className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline">Opprett avtale</a>
						</Link>
					</li>
					<li className="text-xl flex border-t border-gray-200 pt-3 mt-3">
						<span>Strøm</span>
						<Link href="/opprett-avtalegiro">
							<a className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline">Opprett avtale</a>
						</Link>
					</li>
				</ul>
			</div>
			<div
				className={`fixed z-10 inset-0 overflow-y-auto ${!popup ? 'hidden' : 'block'}`}
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<div className={`fixed inset-0 bg-gray-500 transition-opacity ${!popup ? 'opacity-0' : 'bg-opacity-75'}`} aria-hidden="true"></div>

					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>

					<div
						className={`inline-block align-bottom bg-white px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full pb-12 transition duration-300 delay-100 ${
							!popup ? 'opacity-0 scale-90' : 'opacity-1 scale-100'
						}`}
					>
						<div>
							<div className="mt-3 text-center sm:mt-5">
								<h3 className="text-2xl font-medium text-black mb-3">Avslutt avtalegiro</h3>
								<p className="text-base mb-7">Vil du avslutte avtalegiro for Se på TV?</p>
							</div>
						</div>
						<div className="mt-5 sm:mt-6 flex space-x-3 justify-center">
							<button
								type="button"
								className="rounded-md bg-primary px-6 py-2 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition"
								onClick={submitHandle}
							>
								Slett avtale
							</button>
							<button
								className="bg-white p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-pink"
								onClick={submitHandle}
							>
								Avbryt
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AutomaticPayment;
