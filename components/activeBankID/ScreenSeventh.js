import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setError } from './../../redux/actions/activeBankIdAction';

const ScreenSeventh = () => {
	const containerRef = useRef();
	const sidePanel = useRef();
	const { screen, error } = useSelector((state) => state.activeBankId);

	const dispatch = useDispatch();

	useEffect(() => {
		const containerAnimation = new Promise((resolve, reject) => {
			if (containerRef.current !== null) {
				containerRef.current.style.maxWidth = '1215px';
				setTimeout(() => {
					resolve(true);
				}, 500);
			}
		});
		containerAnimation.then(() => {
			if (sidePanel.current !== null) {
				sidePanel.current.classList.remove('hidden');
				setTimeout(() => {
					sidePanel.current.style.opacity = 1;
				}, 50);
			}
		});
	}, []);

	const submitHandle = () => {
		dispatch(setScreen(screen + 1));
	};
	const handleBack = () => {
		dispatch(setScreen(screen - 1));
	};

	return (
		<div className="container max-w-[791px] flex my-6 space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
			<div className="lg:w-[800px] bg-white px-10 py-10 shadow-md left-content transition">
				<h1 className="mb-6">Bestill BankID på mobil</h1>

				<div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
					<h2 className="font-medium text-xl mb-8 max-w-md">
						For å fullføre bestillingen må det gjennomføres en test ved at du taster inn din valgte PIN-kode. Bekreft for å gå videre til testen.{' '}
					</h2>

					<div className="w-32 text-center">
						<button
							type="button"
							className="rounded-md bg-primary p-3 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition w-full"
							onClick={submitHandle}
						>
							Godta
						</button>
						<span className="block text-xl my-4">eller</span>
						<button
							type="button"
							className="bg-white p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-pink block focus:outline-none"
							onClick={handleBack}
						>
							Avbryt
						</button>
					</div>
				</div>
			</div>
			<div className="border border-secondary bg-[#CEEBF5] p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
				<div className="h-full w-full flex flex-col justify-center items-center">
					<div className="w-[204px] relative">
						<img src={require('./../../img/mobile.png')} className="w-full" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScreenSeventh;
