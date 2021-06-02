import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { dropdown } from '../util/dropdown';
import { numberFormat } from './../util/numberFormat';
import { setAccount } from './../redux/actions/accountsAction';
const Transactions = ({ details }) => {
	const [selectedAccount, setSelectedAccount] = useState({
		transaction: [],
	});
	const dispatch = useDispatch();

	useEffect(() => {
		setSelectedAccount(...details.allAccounts.filter((acc) => acc.accountName === details['selectedAccount']));
	}, [details]);

	const selectAccountHandle = (e) => {
		dropdown(e.currentTarget.parentNode);
	};

	const accountChangeHandle = (e) => {
		dispatch(setAccount(e));
	};

	return (
		<Layout>
			<section className="bg-white px-7 shadow-md">
				<div className="pt-10 pb-[200px]">
					<div className="mb-10 flex flex-col">
						<h1 className="mb-6">Mine transaksjoner</h1>
						<div className="ml-auto flex items-center">
							<span className="text-base lg:text-xl mr-4">Velg konto:</span>
							<div className="relative text-base lg:text-xl has-dropdown">
								<button
									type="button"
									className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-11 border border-secondary flex lg:w-[600px] w-[500px] flex has-dropdown"
									onClick={selectAccountHandle}
								>
									<span className="pointer-events-none">
										<strong className="font-anenirHeavy">{selectedAccount.accountNumber}</strong> {selectedAccount.accountName}
									</span>
									<span className="ml-auto pointer-events-none">
										Disponibelt beløp: <strong className="font-anenirHeavy">{numberFormat(selectedAccount.remainingAmount)}</strong>
									</span>
								</button>
								<i className="absolute top-[22px] right-4 w-6 h-4 pointer-events-none">
									<img src={require('./../img/down-arrow.svg')} className="w-6" alt="" />
								</i>
								<ul className="dropdown border border-secondary rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-40 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
									{details.allAccounts
										.filter((acc) => acc.accountName !== details['selectedAccount'])
										.map((account, index) => (
											<li key={index}>
												<button
													onClick={() => accountChangeHandle(account.accountName)}
													className="flex bg-white border-0 w-full px-3 py-3 hover:bg-pink transition  focus:outline-none pr-11"
												>
													<span>
														{account.accountNumber} {account.accountName}
													</span>
													<span className="ml-auto">Disponibelt beløp: {numberFormat(account.remainingAmount)}</span>
												</button>
											</li>
										))}
								</ul>
							</div>
						</div>
					</div>
					<table className="table-fixed border-r border-b border-secondary w-full text-base lg:text-xl">
						<thead>
							<tr className="border-t border-b border-secondary text-left bg-[#E0E0E0]">
								<th className="w-1/5 py-2 lg:px-5 px-3 border-l border-secondary font-anenirHeavy">Dato</th>
								<th className="w-2/5 py-2 lg:px-5 px-3 border-l border-secondary font-anenirHeavy">Mottaker</th>
								<th className="w-1/5 py-2 lg:px-5 px-3 border-l border-secondary text-right font-anenirHeavy">Ut av konto</th>
								<th className="w-1/5 py-2 lg:px-5 px-3 border-l border-secondary text-right font-anenirHeavy">Inn på konto</th>
							</tr>
						</thead>
						<tbody>
							{selectedAccount.transaction.map((el, index) => (
								<tr className={`${index % 2 !== 0 ? 'bg-[#EFEFEF]' : null}`} key={index}>
									<td className="py-3 lg:px-5 px-3 border-l border-secondary align-top">{el.date}</td>
									<td className="py-3 lg:px-5 px-3 border-l border-secondary align-top">{el.details}</td>
									<td className="py-3 lg:px-5 px-3 border-l border-secondary text-right align-top">
										{el.type === 'debit' && '-' + numberFormat(el.amount)}
									</td>
									<td className="py-3 lg:px-5 px-3 border-l border-secondary text-right align-top text-[#2A68A2]">
										{el.type === 'credit' && numberFormat(el.amount)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	details: state.accounts,
});

export default connect(mapStateToProps)(Transactions);
