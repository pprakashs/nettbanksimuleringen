import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { dropdown } from '../util/dropdown';
const Transfer = () => {
	const selectAccountHandle = (e) => {
		dropdown(e.currentTarget.parentNode.parentNode);
	};

	return (
		<Layout>
			<div className="py-10">
				<h1 className="mb-8">Overføre egne kontoer</h1>
				<form className="pb-10">
					<div className="border border-black-100">
						<div className="bg-[#E0E0E0] flex">
							<div className="w-2/3 text-xl font-anenirHeavy px-5 py-2">Overføre fra konto</div>
						</div>

						<div className="flex border-t border-black-100">
							<div className="w-2/3 p-5">
								<div className="relative text-xl">
									<div className="relative">
										<button
											type="button"
											className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-14 border border-[#B3B3B4] w-full text-left text-xl flex"
											onClick={selectAccountHandle}
										>
											<div>
												<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
											</div>
											<div className="ml-auto">
												Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
											</div>
										</button>
										<i className="absolute top-[22px] right-4 w-6 h-4 pointer-events-none">
											<img src={require('./../img/down-arrow.svg')} className="w-6" alt="" />
										</i>
									</div>

									<ul className="dropdown border border-[#B3B3B4] rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-40 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
										<li>
											<button className=" px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14">
												<div>
													<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
												</div>
												<div className="ml-auto">
													Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
												</div>
											</button>
										</li>
										<li>
											<button className=" px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14">
												<div>
													<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
												</div>
												<div className="ml-auto">
													Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
												</div>
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="border border-t-0 border-black-100">
						<div className="bg-[#E0E0E0] flex">
							<div className="w-2/3 text-xl font-anenirHeavy px-5 py-2">Overføre til konto</div>
						</div>

						<div className="flex border-t border-black-100">
							<div className="w-2/3 p-5">
								<div className="relative text-xl">
									<div className="relative">
										<button
											type="button"
											className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-14 border border-[#B3B3B4] w-full text-left text-xl flex"
											onClick={selectAccountHandle}
										>
											<div>
												<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
											</div>
											<div className="ml-auto">
												Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
											</div>
										</button>
										<i className="absolute top-[22px] right-4 w-6 h-4 pointer-events-none">
											<img src={require('./../img/down-arrow.svg')} className="w-6" alt="" />
										</i>
									</div>

									<ul className="dropdown border border-[#B3B3B4] rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-40 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
										<li>
											<button className=" px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14">
												<div>
													<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
												</div>
												<div className="ml-auto">
													Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
												</div>
											</button>
										</li>
										<li>
											<button className=" px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14">
												<div>
													<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
												</div>
												<div className="ml-auto">
													Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
												</div>
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="border border-black-100 mt-6">
						<div className="bg-[#E0E0E0] flex">
							<div className="w-4/12 text-xl px-5 py-2">
								<strong className="font-anenirHeavy">Dato</strong> (dd.mm.åååå)
							</div>
							<div className="w-7/12 border-l border-black-100 text-xl font-anenirHeavy px-5 py-2">Kid/melding</div>
							<div className="w-4/12 border-l border-black-100 text-xl px-5 py-2">
								<strong className="font-anenirHeavy">Beløp</strong> (kr og øre)
							</div>
						</div>

						<div className="flex border-t border-black-100">
							<div className="w-4/12 p-5">
								<div className="flex">
									<input type="text" className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none" />
									<div className="border border-l-0 border-[#B3B3B4] w-[48px] h-[48px] ml-auto flex justify-center items-center">
										<i>
											<img src={require('./../img/calendar-Icon.svg')} alt="" className="w-5" />
										</i>
									</div>
								</div>
							</div>
							<div className="w-7/12 p-5 border-l border-black-100">
								<input type="text" className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none" />
							</div>
							<div className="w-4/12 border-l border-black-100 p-5">
								<div className="flex space-x-4">
									<input type="text" className="border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-8/12" />
									<input type="text" className="border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-4/12" />
								</div>
							</div>
						</div>
					</div>

					<button type="submit" className="rounded-md bg-primary px-6 py-3 text-white font-anenirHeavy text-xl mt-7 uppercase">
						Bekreft overføring
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Transfer;
