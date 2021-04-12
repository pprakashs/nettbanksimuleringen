import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { dropdown } from '../util/dropdown';
import { numberFormat } from './../util/numberFormat';
import { set_account } from './../redux/actions/accountsAction';
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
		dispatch(set_account(e));
	};

	return (
		<Layout>
			<div className="pt-10 pb-[200px]">
				<div className="flex mb-10">
					<h1>Mine transaksjoner</h1>
					<div className="ml-auto flex items-center">
						<span className="text-xl mr-4">Velg konto:</span>
						<div className="relative text-xl">
							<button
								type="button"
								className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-11 block border border-secondary rounded"
								onClick={selectAccountHandle}
							>
								{selectedAccount.accountNumber} {selectedAccount.accountName}
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
												className="block bg-white border-0 w-full px-3 py-3 hover:bg-pink transition text-left focus:outline-none"
											>
												{account.accountNumber} {account.accountName}
											</button>
										</li>
									))}
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
						{selectedAccount.transaction.map((el, index) => (
							<tr className="text-xl" key={index}>
								<td className="p-3 border-l border-secondary align-top">{el.date}</td>
								<td className="p-[10px] border-l border-secondary pl-5 align-top">{el.details}</td>
								<td className="p-3 border-l pr-5 border-secondary text-right align-top">{el.type === 'debit' && numberFormat(el.amount)}</td>
								<td className="p-3 border-l pr-5 border-secondary text-right align-top">{el.type === 'credit' && numberFormat(el.amount)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	details: state.accounts,
});

export default connect(mapStateToProps)(Transactions);
