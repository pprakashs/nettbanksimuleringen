import { useState, useRef } from 'react';
import Layout from './../components/Layout';
import { dropdown } from './../util/dropdown';
const Transactions = () => {
	const accountRef = useRef();
	const selectAccountHandle = () => {
		dropdown(accountRef);
	};
	return (
		<Layout>
			<section className="bg-white px-7 pt-10 pb-[200px] shadow-md">
				<div className="flex mb-10">
					<h1>Mine transaksjoner</h1>
					<div className="ml-auto flex items-center">
						<span className="text-xl mr-4">Velg konto:</span>
						<div className="relative text-xl" ref={accountRef}>
							<button
								type="button"
								className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-11 block border border-secondary rounded"
								onClick={selectAccountHandle}
							>
								1234.56.78910 Brukskonto
							</button>
							<svg
								className="absolute top-3 right-2 w-6 h-6 pointer-events-none"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
							<ul className="dropdown border border-secondary rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-40 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
								<li>
									<a href="#" className="block px-3 py-3 hover:bg-pink transition">
										1234.43.21012 Sparekonto
									</a>
								</li>
								<li>
									<a href="#" className="block px-3 py-3 hover:bg-pink transition">
										4321.01.23456 Kredittkort
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<table className="table-fixed border-r border-b border-secondary w-full">
					<thead>
						<tr className="border-t border-b border-secondary text-left bg-[#E0E0E0] text-xl">
							<th className="w-2/5 p-2 border-l border-secondary font-anenirHeavy">Dato</th>
							<th className="w-1/5 p-2 border-l border-secondary font-anenirHeavy pl-5">Forklaring</th>
							<th className="w-1/5 p-2 pr-5 border-l border-secondary text-right font-anenirHeavy">Ut av konto</th>
							<th className="w-1/5 p-2 pr-5 border-l border-secondary text-right font-anenirHeavy">Inn på konto</th>
						</tr>
					</thead>
					<tbody>
						<tr className="text-xl">
							<td className="p-3 border-l border-secondary">Dagens dato</td>
							<td className="p-3 border-l border-secondary pl-5">Abonnement</td>
							<td className="p-3 border-l pr-5 border-secondary text-right">29.879,67</td>
							<td className="p-3 border-l pr-5 border-secondary text-right">29.879,67</td>
						</tr>
						<tr className="text-xl">
							<td className="p-3 border-l border-secondary">I går</td>
							<td className="p-3 border-l border-secondary pl-5">Strøm</td>
							<td className="p-3 border-l pr-5 border-secondary text-right">46.788,43 </td>
							<td className="p-3 border-l pr-5 border-secondary text-right">46.788,43</td>
						</tr>
						<tr className="text-xl">
							<td className="p-3 border-l border-secondary">I går</td>
							<td className="p-3 border-l border-secondary pl-5">Husleie</td>
							<td className="p-3 border-l pr-5 border-secondary text-right">20.000,00</td>
							<td className="p-3 border-l pr-5 border-secondary text-right">20.000,00</td>
						</tr>
					</tbody>
				</table>
			</section>
		</Layout>
	);
};

export default Transactions;
