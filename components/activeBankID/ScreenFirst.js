import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setError } from './../../redux/actions/activeBankIdAction';

const ScreenFirst = () => {
	const containerRef = useRef();
	const sidePanel = useRef();
	const { screen, error } = useSelector((state) => state.activeBankId);

	const dispatch = useDispatch();
	const router = useRouter();

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

	const submitHandle = (e) => {
		e.preventDefault();
		const mobileNumber = e.target.mobileNumber.value;
		if (mobileNumber === '' || mobileNumber.length !== 8) {
			dispatch(setError('Skriv inn 8 siffer'));
			return;
		}
		sidePanel.current.style.opacity = 0;
		setTimeout(() => {
			sidePanel.current.classList.add('hidden');
			containerRef.current.style.maxWidth = '790px';
			e.target.mobileNumber.value = '';
			dispatch(setScreen(screen + 1));
			dispatch(setError(false));
		}, 500);
	};
	const handleBack = () => {
		dispatch(setError(false));
		router.push('/konto');
	};

	return (
		<div className="container max-w-[791px] flex my-6 space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
			<div className="lg:w-[800px] bg-white px-10 py-10 shadow-md">
				<h1 className="mb-6">Bestill BankID på mobil</h1>

				<div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
					<p className="max-w-xs pb-7">Vær oppmerksom på at noen mobilleverandører kan ta betalt for bruk av mobile tjenester. </p>

					<form onSubmit={submitHandle}>
						<fieldset className="max-w-[278px]">
							<div className="mb-8">
								<label className="max-w-xs mb-3 block">Skriv inn hvilket mobilnummer du ønsker å knytte BankID på mobil til. </label>
								<input
									type="number"
									placeholder="Ditt mobilnummer (8 siffer)"
									name="mobileNumber"
									className="number-field focus:outline-none border border-gray-300 px-3 py-2 text-xl w-full"
								/>
								{error && <div className="text-red-600 text-lg mt-2">{error}</div>}
							</div>

							<div className="w-32 text-center">
								<button
									type="submit"
									className="rounded-md bg-primary p-3 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition w-full"
								>
									Neste
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
						</fieldset>
					</form>
				</div>
			</div>
			<div className="border border-secondary bg-[#CEEBF5] p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
				<div className="intro-text transition duration-300">
					<h1 className="mb-5">Oppgavetekst</h1>
					<p className="text-base max-w-[250px]">Du ønsker å aktivere BankID på mobil for ditt mobilnummer.</p>

					<button className="text-black w-6 h-6 absolute top-3 right-3 focus:outline-none">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ScreenFirst;
