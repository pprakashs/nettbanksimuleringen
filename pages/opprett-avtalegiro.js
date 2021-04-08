import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { dropdown } from '../util/dropdown';
const CreateAutoPayment = () => {
	const [tooltip, setTooltip] = useState(false);

	const selectAccountHandle = (e) => {
		dropdown(e.currentTarget.parentNode.parentNode);
	};

	return (
		<Layout>
			<div className="py-10">
				<h1 className="mb-8">Opprette avtalegiro</h1>
				<form className="pb-10">
					<div className="border border-black-100">
						<div className="bg-[#E0E0E0] flex">
							<div className="w-2/3 text-xl font-anenirHeavy px-5 py-2">Fra konto</div>
							<div className="w-1/3 border-l border-black-100 text-xl font-anenirHeavy px-5 py-2">Til</div>
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

									<ul className="dropdown border border-[#B3B3B4] rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-50 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
										<li className="px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14 cursor-pointer">
											<div>
												<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
											</div>
											<div className="ml-auto">
												Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
											</div>
										</li>
										<li className="px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14 cursor-pointer">
											<div>
												<strong className="font-anenirHeavy">1234.56.78910</strong> Brukskonto
											</div>
											<div className="ml-auto">
												Disponibel saldo: <strong className="font-anenirHeavy">28 876,69</strong>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="w-1/3 border-l border-black-100 p-5">
								<div className="flex text-base items-left flex-col">
									<span className="text-xl">Se på TV</span>
									Kontonummer: 1234.12.12345
								</div>
							</div>
						</div>
					</div>

					<div className="border border-black-100 border-t-0">
						<div className="bg-[#E0E0E0] flex relative">
							<div
								className={`bg-pink p-4 border shadow-sm border-primary text-center text-xl max-w-md tooltip-popup absolute -top-10 left-7 z-40 transition delay-100 ${
									!tooltip ? 'opacity-0' : 'opacity-1'
								}`}
							>
								Begrens hva mottaker kan belaste per måned.
							</div>
							<div className="w-2/5 text-xl px-5 py-2 flex items-center">
								<div
									className="border-2 bg-white mr-3 border-primary rounded-full w-8 h-8 justify-center items-center flex font-bold text-blue text-xl tooltip focus:outline-none cursor-pointer"
									onClick={() => setTooltip(!tooltip)}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="10.08" height="17.568" viewBox="0 0 10.08 17.568">
										<path
											id="Path_35"
											data-name="Path 35"
											d="M18.54,19.248V17.784a5.091,5.091,0,0,1,.1-1.08,2.914,2.914,0,0,1,.288-.78,3.019,3.019,0,0,1,.516-.672q.324-.324.8-.78.384-.36.768-.732a7.739,7.739,0,0,0,.7-.768,4.162,4.162,0,0,0,.516-.84,2.358,2.358,0,0,0,.2-1,2.525,2.525,0,0,0-.2-1.02,2.582,2.582,0,0,0-.54-.8,2.423,2.423,0,0,0-.8-.528,2.6,2.6,0,0,0-1-.192,2.558,2.558,0,0,0-1.908.744A3.228,3.228,0,0,0,17.1,11.28l-2.448-.24a5.057,5.057,0,0,1,1.74-3.276,5.349,5.349,0,0,1,3.54-1.188,5.777,5.777,0,0,1,1.884.3,4.527,4.527,0,0,1,1.524.864,3.979,3.979,0,0,1,1.02,1.392,4.551,4.551,0,0,1,.372,1.884,4.419,4.419,0,0,1-.264,1.6,4.836,4.836,0,0,1-.744,1.284l-1.44,1.488-.24.216q-.384.36-.612.612a2.21,2.21,0,0,0-.36.528,2.1,2.1,0,0,0-.18.612,6.1,6.1,0,0,0-.048.84v1.056Zm-.456,3.312a1.6,1.6,0,1,1,.468,1.116A1.524,1.524,0,0,1,18.084,22.56Z"
											transform="translate(-14.652 -6.576)"
											fill="#d34618"
										/>
									</svg>
								</div>
								<strong className="font-anenirHeavy">Beløpsgrense per måned (kr og øre)</strong>
							</div>
							<div className="w-3/5 border-l border-black-100 text-xl font-anenirHeavy px-5 py-2">
								<strong className="font-anenirHeavy">Egen kommentar</strong>
							</div>
						</div>

						<div className="flex border-t border-black-100">
							<div className="w-2/5 p-5">
								<div className="flex space-x-4 max-w-xs">
									<input type="text" className="border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-8/12" />
									<input type="text" className="border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-4/12" />
								</div>
							</div>
							<div className="w-3/5 p-5 border-l border-black-100">
								<input type="text" className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none" />
							</div>
						</div>
					</div>
					<div className="flex space-x-4 mt-7">
						<button
							type="submit"
							className="rounded-md bg-primary px-6 py-2 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition"
						>
							Opprett avtale
						</button>
						<a
							href="#"
							className="bg-white p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-pink"
						>
							Avbryt
						</a>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default CreateAutoPayment;