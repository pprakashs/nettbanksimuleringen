import { useState, useRef } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { numberFormat } from './../util/numberFormat';
import Layout from '../components/Layout';
import { setAccount } from './../redux/actions/accountsAction';

const Account = ({ accounts }) => {
	const [tooltip, setTooltip] = useState(false);
	const [tooltipId, setTooltipId] = useState(null);
	const tooltipRef = useRef();
	const dispatch = useDispatch();

	const tooltipHandle = (e) => {
		const { clientX, clientY } = e;

		setTooltipId(e.currentTarget.getAttribute('data-tip'));
		tooltipRef.current.style.top = clientY - 100 + 'px';
		tooltipRef.current.style.left = clientX - 170 + 'px';
		if (tooltipId === e.currentTarget.getAttribute('data-tip')) {
			setTooltip(false);
			e.currentTarget.setAttribute('data-tip', e.currentTarget.getAttribute('data-tip') + 'px');
			setTimeout(() => {
				tooltipRef.current.style.top = '0px';
			}, 400);
			return;
		}
		setTooltip(true);
	};

	const clickHandle = (e) => {
		// const accountName = e.toLowerCase();
		dispatch(setAccount(e));
	};
	return (
		<Layout>
			<section className="bg-white px-7 shadow-md">
				<div className="px-7 pt-10 pb-[200px]">
					<div
						className={`bg-[#F5E3B7] p-4 border shadow-md border-primary text-center text-xl w-[334px] tooltip-popup absolute ${
							!tooltip ? 'hidden' : 'block'
						}`}
						ref={tooltipRef}
					>
						Denne funksjonen er dessverre ikke aktiv i nettbanksimuleringen.
					</div>
					<h1 className="mb-6">Startsiden</h1>
					<table className="table-fixed border-r border-b border-secondary w-full text-xl">
						<thead>
							<tr className="border-t border-secondary text-left bg-[#E0E0E0]">
								<th className="w-2/5 p-2 border-l border-secondary font-anenirHeavy">Navn</th>
								<th className="w-1/5 p-2 border-l border-secondary text-center font-anenirHeavy">Kontonummer</th>
								<th className="w-1/5 p-2 pr-5 border-l border-secondary text-right font-anenirHeavy">Bokført saldo</th>
								<th className="w-1/5 p-2 pr-5 border-l border-secondary text-right font-anenirHeavy">Disponibelt beløp</th>
								<th className="w-10"> </th>
							</tr>
						</thead>
						<tbody>
							{accounts.map((account, index) => (
								<tr className="border-t border-secondary" key={index}>
									<td className="p-2 border-l border-secondary">
										<Link href="/oversikt">
											<a className="underline hover:no-underline" onClick={() => clickHandle(account.accountName)}>
												{account.accountName}
											</a>
										</Link>
									</td>
									<td className="p-2 border-l border-secondary text-center">{account.accountNumber}</td>
									<td className="p-2 border-l pr-5 border-secondary text-right">{numberFormat(account.actualAmount)}</td>
									<td className="p-2 border-l pr-5 border-secondary text-right">{numberFormat(account.remainingAmount)}</td>
									<th className="w-10 border-l border-secondary bg-pink">
										<div
											className="bg-none border-0 outline-none flex justify-center items-center w-full text-gray-600 focus:outline-none cursor-pointer"
											onClick={tooltipHandle}
											data-tip="1"
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
												/>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										</div>
									</th>
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
	accounts: state.accounts.allAccounts,
});

export default connect(mapStateToProps)(Account);
