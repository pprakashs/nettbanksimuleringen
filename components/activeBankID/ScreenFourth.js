import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setError, setPassword } from './../../redux/actions/activeBankIdAction';
import tooltip from './../../util/tooltip';

const ScreenFourth = () => {
	const containerRef = useRef();

	const dispatch = useDispatch();
	const { screen, error } = useSelector((state) => state.activeBankId);

	useEffect(() => {
		tooltip();
	}, []);
	const submitHandle = (e) => {
		e.preventDefault();
		const password = e.target.password.value;
		if (password === '' || password.length < 7 || password.length > 12) {
			dispatch(setError('Passordet må være mellom 8 og 16 tegn langt.'));
			return;
		}
		dispatch(setPassword(password));
		dispatch(setError(false));
		dispatch(setScreen(screen + 1));
	};
	return (
		<div className="container max-w-[1215px] flex my-6 space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
			<div className="lg:w-[800px] bg-white px-10 py-10 shadow-md">
				<h1 className="mb-6">Bekreft handlingen med passord</h1>

				<div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
					<h2 className="text-2xl font-medium mb-8 max-w-[470px]">Vennligst bekreft handlingen med ditt personlige passord. </h2>

					<form onSubmit={submitHandle}>
						<div className="flex items-center mb-5">
							<button
								type="button"
								className="border-2 border-primary rounded-full w-8 h-8 justify-center items-center flex font-bold text-blue text-xl tooltip focus:outline-none"
								data-tooltip-text="Skriv inn et fiktivt passord"
								data-tooltip-bg="bg-pink"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none" width="10.08" height="17.568" viewBox="0 0 10.08 17.568">
									<path
										id="Path_35"
										data-name="Path 35"
										d="M18.54,19.248V17.784a5.091,5.091,0,0,1,.1-1.08,2.914,2.914,0,0,1,.288-.78,3.019,3.019,0,0,1,.516-.672q.324-.324.8-.78.384-.36.768-.732a7.739,7.739,0,0,0,.7-.768,4.162,4.162,0,0,0,.516-.84,2.358,2.358,0,0,0,.2-1,2.525,2.525,0,0,0-.2-1.02,2.582,2.582,0,0,0-.54-.8,2.423,2.423,0,0,0-.8-.528,2.6,2.6,0,0,0-1-.192,2.558,2.558,0,0,0-1.908.744A3.228,3.228,0,0,0,17.1,11.28l-2.448-.24a5.057,5.057,0,0,1,1.74-3.276,5.349,5.349,0,0,1,3.54-1.188,5.777,5.777,0,0,1,1.884.3,4.527,4.527,0,0,1,1.524.864,3.979,3.979,0,0,1,1.02,1.392,4.551,4.551,0,0,1,.372,1.884,4.419,4.419,0,0,1-.264,1.6,4.836,4.836,0,0,1-.744,1.284l-1.44,1.488-.24.216q-.384.36-.612.612a2.21,2.21,0,0,0-.36.528,2.1,2.1,0,0,0-.18.612,6.1,6.1,0,0,0-.048.84v1.056Zm-.456,3.312a1.6,1.6,0,1,1,.468,1.116A1.524,1.524,0,0,1,18.084,22.56Z"
										transform="translate(-14.652 -6.576)"
										fill="#d34618"
									/>
								</svg>
							</button>
							<span className="text-xl ml-5">Skriv inn passord</span>
						</div>
						<div className="flex">
							<input
								type="password"
								name="password"
								className="border-2 border-primary p-3 text-xl block number-field focus:outline-none h-13 w-72"
								placeholder="Passord"
							/>

							<button type="submit" className="bg-primary h-13 w-16 ml-4 flex justify-center items-center focus:outline-none ">
								<svg xmlns="http://www.w3.org/2000/svg" width="30.001" height="22.002" viewBox="0 0 30.001 22.002">
									<path
										d="M20.354,5.146a.5.5,0,0,0-.708,0l-2,2a.5.5,0,0,0,0,.708L23.793,14H1.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5H23.793l-6.147,6.146a.5.5,0,0,0,0,.708l2,2a.5.5,0,0,0,.708,0l10.5-10.5a.5.5,0,0,0,0-.708Z"
										transform="translate(-1 -4.999)"
										fill="#fff"
									/>
								</svg>
							</button>
						</div>
						{error && <div className="text-red-600 pt-3 text-xl">{error}</div>}
					</form>
				</div>
			</div>
		</div>
	);
};

export default ScreenFourth;
