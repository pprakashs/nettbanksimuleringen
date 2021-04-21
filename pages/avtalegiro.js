import { useState } from 'react';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { deleteAutoPayment, setAutoPayment } from './../redux/actions/autoPaymentAction';

const AutomaticPayment = ({ autoPayments, autoPaymentSuggestion }) => {
	const [popup, setPopup] = useState(false);
	const [accountNumber, setAccountNumber] = useState(false);
	const dispatch = useDispatch();
	const submitHandle = (accNumber) => {
		setPopup(!popup);
		setAccountNumber(accNumber);
	};
	const deleteHandel = () => {
		dispatch(deleteAutoPayment(accountNumber));
		setPopup(!popup);
	};
	const setAutoPaymentHandle = (accNumber) => {
		dispatch(setAutoPayment(accNumber));
	};
	return (
		<Layout>
			<section className="bg-white px-7 shadow-md">
				<div className="py-10">
					<h1 className="mb-5">Avtalegiro</h1>
					{autoPayments.length > 0 && (
						<>
							<h2 className="text-2xl font-avenir pb-2">Dine avtaler</h2>
							<ul className="border-b border-gray-200 pb-3 mb-8">
								{autoPayments.map((list, index) => (
									<li className="text-xl flex border-t border-gray-200 pt-3 mt-3" key={index}>
										<span>{list.name}</span>
										<button
											type="button"
											className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline"
											onClick={() => submitHandle(list.accountNumber)}
										>
											Avslutt avtale
										</button>
									</li>
								))}
							</ul>
						</>
					)}
					{/* for the suggestion*/}
					{autoPaymentSuggestion.length > 0 && (
						<>
							<h2 className="text-2xl font-avenir pb-2">Forslag til avtaler</h2>
							<ul>
								{autoPaymentSuggestion.map((list, index) => (
									<li className="text-xl flex border-t border-gray-200 pt-3 mt-3" key={index}>
										<span>{list.name}</span>
										<Link href="/opprett-avtalegiro">
											<a
												onClick={() => setAutoPaymentHandle(list.accountNumber)}
												className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline"
											>
												Opprett avtale
											</a>
										</Link>
									</li>
								))}
							</ul>
						</>
					)}
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
									onClick={deleteHandel}
								>
									Slett avtale
								</button>
								<button
									className="bg-white p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-pink"
									onClick={() => setPopup(!popup)}
								>
									Avbryt
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};
const mapStateToProps = (state) => ({
	autoPayments: state.autoPayments.autoPayments,
	autoPaymentSuggestion: state.autoPayments.autoPaymentSuggestion,
});
export default connect(mapStateToProps)(AutomaticPayment);
