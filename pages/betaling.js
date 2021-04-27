import { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { dropdown } from '../util/dropdown';
import { getTodayDate, getDateFuture } from './../util/dates';
import { numberFormat } from './../util/numberFormat';
import { createPayment, setAccount } from './../redux/actions/accountsAction';
import { taskPaymentCreated, taskPaymentPanel } from './../redux/actions/taskAction';
import { setTransaction } from './../redux/actions/transactionAction';
import panelAnimation from './../util/panelAnimation';

const Payment = ({ accounts, task, transaction }) => {
	const [selectedAccount, setSelectedAccount] = useState({});

	const [error, setError] = useState(false);
	const [sideBar, setSidebar] = useState(true);
	const containerRef = useRef();
	const sidePanel = useRef();
	const router = useRouter();
	const dispatch = useDispatch();

	let amountStr = null;
	let details = '';

	// if (!task.completed) {
	// 	amountStr = task.payment.amount.toString().split('.');
	// 	details = task.payment.kidNumber;
	// }
	if (transaction !== null && transaction.paymentType === 'payment') {
		amountStr = transaction.amount.toString().split('.');
		details = transaction.kidNumber;
	}

	useEffect(() => {
		if (!task.completed) panelAnimation(containerRef, sidePanel);
		if (transaction !== null && transaction.paymentType === 'payment') {
			setSelectedAccount(...accounts.filter((acc) => acc.accountName === transaction.selectedAccountName));
			return;
		}
		setSelectedAccount(...accounts.filter((acc) => acc.accountName === 'Brukskonto'));
	}, []);

	const selectAccountHandle = (e) => {
		dropdown(e.currentTarget.parentNode.parentNode);
	};

	const changeAccountHandle = (accountName) => {
		setSelectedAccount(...accounts.filter((acc) => acc.accountName === accountName));
	};

	const sidebarCloseHandle = () => {
		dispatch(taskPaymentPanel(!task.panel));
		setSidebar(false);
		if (!task.completed) {
			containerRef.current.style.width = '100%';
			sidePanel.current.classList.add('hidden');
		}
	};
	const sidebarPanelOpenHandle = () => {
		dispatch(taskPaymentPanel(!task.panel));
		setSidebar(true);
		if (!task.completed) panelAnimation(containerRef, sidePanel);
	};

	const submitHandle = (e) => {
		e.preventDefault();
		const target = e.target.elements;
		const amount = `${target.amount.value}.${target.amountCent.value}`;
		const amountInt = amount * 1;

		if (!task.completed && task.payment.accountNumber !== target.accountNumber.value) {
			setError('Kontonummeret stemmer ikke med regningen');
			return;
		}
		if (!task.completed && task.payment.kidNumber !== target.details.value) {
			setError('Kidnummer stemmer ikke med regningen');
			return;
		}
		if (!task.completed && task.payment.amount !== amountInt) {
			setError('Beløpet stemmer ikke med regningen');
			return;
		}

		if ((!task.completed && target.accountNumber.value === '') || target.accountNumber.value.length < 11) {
			setError('Kontonummer må inneholde 11 siffer');
			return;
		}
		if (!task.completed && amountInt > task.payment.amount) {
			setError('Du kan ikke overføre mer enn det du har tilgjengelig på konto');
			return;
		}
		if (amount === '.') {
			setError('Beløp må fylles ut');
			return;
		}
		if (amountInt > selectedAccount.remainingAmount) {
			setError('Du kan ikke overføre mer enn det du har tilgjengelig på konto');
			return;
		}
		details = target.details.value;
		if (!task.completed) {
			details = task.payment.name;
		}
		const data = {
			selectedAccountName: selectedAccount.accountName,
			selectedAccountNumber: selectedAccount.accountNumber,
			transferAccountNumber: target.accountNumber.value,
			amount: amount * 1,
			details: details,
			kidNumber: target.details.value,
			type: 'debit',
			paymentType: 'payment',
			notat: target.notat.value,
			navn: target.navn.value,
		};

		dispatch(setTransaction(data));
		router.push('/bekreft-betaling');
	};

	return (
		<Layout>
			<div className="flex space-x-6">
				<section className="bg-white px-7 shadow-md w-full transition-all duration-500" ref={containerRef}>
					<div className="py-10">
						<h1 className="mb-8">Ny betaling</h1>
						<form className="pb-10" onSubmit={submitHandle}>
							<div className="flex">
								<h3 className="text-2xl mb-3 font-normal">Betalingsdetaljer</h3>
								{!sideBar && (
									<button onClick={sidebarPanelOpenHandle} className="bg-none text-black underline ml-auto text-xl focus:outline-none">
										Vis oppgavetekst
									</button>
								)}
							</div>

							<div className="border border-black-100 text-base lg:text-xl">
								<div className="bg-[#E0E0E0] flex">
									<div className="w-2/3 font-anenirHeavy lg:px-5 px-3 py-2">Fra konto</div>
									<div className="w-1/3 border-l border-black-100 font-anenirHeavy lg:px-5 px-3 py-2">Til konto</div>
								</div>

								<div className="flex border-t border-black-100">
									<div className="w-2/3 py-5 lg:px-5 px-3">
										<div className="relative">
											<div className="relative">
												<button
													type="button"
													className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-14 border border-[#B3B3B4] w-full text-left flex"
													onClick={selectAccountHandle}
												>
													<div>
														{!task.panel && <strong className="font-anenirHeavy">{selectedAccount.accountNumber}</strong>}{' '}
														{selectedAccount.accountName}
													</div>
													<div className="ml-auto">
														Disponibelt beløp: <strong className="font-anenirHeavy">{numberFormat(selectedAccount.remainingAmount)}</strong>
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
												{accounts
													.filter((acc) => acc.accountName !== selectedAccount.accountName)
													.map((account, index) => (
														<li key={index}>
															<button
																type="button"
																onClick={() => changeAccountHandle(account.accountName)}
																className=" px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14"
															>
																<div>
																	{task.completed && <strong className="font-anenirHeavy">{account.accountNumber}</strong>} {account.accountName}
																</div>
																<div className="ml-auto">
																	Disponibelt beløp: <strong className="font-anenirHeavy">{numberFormat(account.remainingAmount)}</strong>
																</div>
															</button>
														</li>
													))}
											</ul>
										</div>
									</div>
									<div className="w-1/3 border-l border-black-100 py-5 lg:px-5 px-3">
										<div className="flex">
											<input
												type="text"
												defaultValue={transaction !== null ? transaction.transferAccountNumber : ''}
												name="accountNumber"
												className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none"
											/>
											<div
												className="border border-l-0 border-[#B3B3B4] w-[48px] h-[48px] ml-auto flex justify-center items-center tooltip cursor-pointer"
												data-tooltip-text="Denne funksjonen er dessverre ikke aktiv i nettbanksimuleringen"
											>
												<i class="pointer-events-none">
													<img src={require('./../img/book-icon.svg')} alt="" className="w-5" />
												</i>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="border border-black-100 border-t-0">
								<div className="bg-[#E0E0E0] flex">
									<div className="w-1/2 lg:px-5 px-3 py-2 font-anenirHeavy">Mottakers navn</div>
									<div className="w-1/2 border-l border-black-100 font-anenirHeavy lg:px-5 px-3 py-2">Eget notat</div>
								</div>

								<div className="flex border-t border-black-100">
									<div className="w-1/2 p-5 py-9 lg:px-5 px-3">
										<input
											name="navn"
											defaultValue={transaction !== null ? transaction.navn : ''}
											type="text"
											className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none"
										/>
									</div>
									<div className="w-1/2 p-5 py-9 lg:px-5 px-3 border-l border-black-100">
										<input
											name="notat"
											defaultValue={transaction !== null ? transaction.notat : ''}
											type="text"
											className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none"
										/>
									</div>
								</div>
							</div>

							<div className="border border-black-100 border-t-0">
								<div className="bg-[#E0E0E0] flex">
									<div className="w-4/12 lg:px-5 px-3 py-2">
										<strong className="font-anenirHeavy">Dato</strong> (dd.mm.åååå)
									</div>
									<div className="w-7/12 border-l border-black-100 font-anenirHeavy lg:px-5 px-3 py-2">KID/melding</div>
									<div className="w-4/12 border-l border-black-100 lg:px-5 px-3 py-2">
										<strong className="font-anenirHeavy">Beløp</strong> (kr og øre)
									</div>
								</div>

								<div className="flex border-t border-black-100">
									<div className="w-4/12 p-5 py-9 lg:px-5 px-3">
										<div className="flex">
											<div className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none">{getTodayDate()}</div>
											<div
												className="border border-l-0 border-[#B3B3B4] w-[48px] h-[48px] ml-auto flex justify-center items-center tooltip cursor-pointer"
												data-tooltip-text="Denne funksjonen er dessverre ikke aktiv i nettbanksimuleringen"
											>
												<i className="pointer-events-none">
													<img src={require('./../img/calendar-Icon.svg')} alt="" className="w-5" />
												</i>
											</div>
										</div>
									</div>
									<div className="w-7/12 p-5 py-9 lg:px-5 px-3 border-l border-black-100">
										<input
											name="details"
											type="text"
											className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none"
											defaultValue={details}
										/>
									</div>
									<div className="w-4/12 border-l border-black-100 p-5 py-9 lg:px-5 px-3">
										<div className="flex space-x-4">
											<input
												type="number"
												name="amount"
												defaultValue={amountStr !== null && amountStr[0]}
												className="border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-8/12 number-field"
											/>
											<input
												type="number"
												name="amountCent"
												defaultValue={amountStr !== null && amountStr[1]}
												className="border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-4/12 number-field"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="flex space-x-8 items-center mt-7">
								<button
									type="submit"
									className="rounded-md bg-primary px-6 py-2 text-white font-anenirHeavy text-xl  uppercase focus:outline-none hover:bg-pink transition hover:text-black"
								>
									Bekreft betaling
								</button>
								{error && <div className="text-lg text-red-600">{error}</div>}
							</div>
						</form>
					</div>
				</section>
				{!task.completed && (
					<>
						{task.panel && (
							<div className="w-3/12 p-5 border border-secondary bg-[#CEEBF5] relative  hidden opacity-0 transition duration-300" ref={sidePanel}>
								<h1 className="mb-5 text-lg">Oppgavetekst</h1>
								<p className="text-base">
									Du har mottatt en regning fra strømmetjenesten «Se på TV» med forfallsdato: {getDateFuture(7)}. Du vil betale regningen i nettbanken
									din i dag. Regningen er på 139,90 kr. Betal til deres kontonummer 3456.12.12345 med KID 70018230419.
								</p>

								<button type="button" onClick={sidebarCloseHandle} className="text-black w-6 h-6 absolute top-3 right-3 focus:outline-none">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	accounts: state.accounts.allAccounts,
	task: state.task.taskPayment,
	transaction: state.transaction,
});

export default connect(mapStateToProps)(Payment);
