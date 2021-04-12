import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { dropdown } from '../util/dropdown';
const Payment = () => {
	const selectAccountHandle = (e) => {
		dropdown(e.currentTarget.parentNode.parentNode);
	};
	const d = new Date();
	return (
		<Layout>
			<div className="py-10">
				<h1 className="mb-8">Registrere betaling</h1>
				<form className="pb-10">
					<div className="border border-black-100">
						<div className="bg-[#E0E0E0] flex">
							<div className="w-2/3 text-xl font-anenirHeavy px-5 py-2">Betale fra</div>
							<div className="w-1/3 border-l border-black-100 text-xl font-anenirHeavy px-5 py-2">Betale til</div>
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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="5"
											viewBox="0 0 16.387 6.193"
											className="absolute top-[17px] right-4 w-6 h-4 pointer-events-none"
										>
											<g id="Down_arrow" data-name="Down arrow" transform="translate(0.693 0.693)">
												<path
													id="Path_10"
													data-name="Path 10"
													d="M15.5,5.5,8,10.5.5,5.5"
													transform="translate(-0.5 -5.5)"
													fill="none"
													stroke="#000"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeMiterlimit="10"
													strokeWidth="1"
												/>
											</g>
										</svg>
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
							<div className="w-1/3 border-l border-black-100 p-5">
								<div className=" flex">
									<input type="text" className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none" />
									<div className="border border-l-0 border-[#B3B3B4] w-[48px] h-[48px] ml-auto flex justify-center items-center">
										<i>
											<img src={require('./../img/book-icon.svg')} alt="" className="w-5" />
										</i>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="border border-black-100 border-t-0">
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
									<div className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none">
										{('0' + (d.getMonth() + 1)).slice(-2)}.{('0' + d.getDate()).slice(-2)}.{d.getFullYear()}
									</div>
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

					<button type="submit" className="rounded-md bg-primary px-6 py-2 text-white font-anenirHeavy text-xl mt-7 uppercase">
						Bekreft betaling
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Payment;
