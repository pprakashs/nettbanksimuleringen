import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { numberFormat } from './../util/numberFormat';
import { getTodayDate } from './../util/dates';

import Layout from '../components/Layout';
import { taskPaymentPanel } from './../redux/actions/taskAction';

const PaymentReview = ({ transaction, user }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (transaction === null) router.push('/betaling');
	}, []);

	const submitHandle = () => {
		router.push(`/bankid/${user.verifiedType}/bekreft-steg1`);
	};

	const backHandle = () => {
		dispatch(taskPaymentPanel(true));
		router.push('/betaling');
	};

	return (
		<Layout>
			<section className="bg-white px-7 shadow-md py-10 pb-24 text-base lg:text-xl">
				<h1 className="mb-8">Bekreft betaling</h1>
				<h3 className="text-2xl mb-3 font-normal">Betalingsdetaljer</h3>

				<div className="border border-black-100">
					<div className="bg-[#E0E0E0] flex">
						<div className="w-3/5 font-anenirHeavy lg:px-5 px-3 py-2">Betale fra</div>
						<div className="w-2/5 border-l border-black-100 font-anenirHeavy lg:px-5 px-3 py-2">Betale til</div>
					</div>
					<div className="flex border-t border-black-100 bg-pink">
						<div className="w-3/5 p-5 py-12 lg:px-5 px-3">{transaction !== null && transaction.selectedAccountNumber}</div>
						<div className="w-2/5  p-5 py-12 lg:px-5 px-3 border-l border-black-100">{transaction !== null && transaction.transferAccountNumber}</div>
					</div>
				</div>

				<div className="border border-black-100 border-t-0">
					<div className="bg-[#E0E0E0] flex">
						<div className="w-1/2 font-anenirHeavy lg:px-5 px-3 py-2">Mottakers navn</div>
						<div className="w-1/2 border-l border-black-100 font-anenirHeavy lg:px-5 px-3 py-2">Eget notat</div>
					</div>
					<div className="flex border-t border-black-100 bg-pink">
						<div className="w-1/2 p-5 py-12 lg:px-5 px-3">{transaction !== null && transaction.navn}</div>
						<div className="w-1/2  p-5 py-12 lg:px-5 px-3 border-l border-black-100">{transaction !== null && transaction.notat}</div>
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

					<div className="flex border-t border-black-100 bg-pink">
						<div className="w-4/12 lg:px-5 px-3 py-12">{transaction !== null && getTodayDate()}</div>
						<div className="w-7/12 lg:px-5 px-3 py-12 border-l border-black-100">{transaction !== null && transaction.kidNumber}</div>
						<div className="w-4/12 border-l border-black-100 lg:px-5 px-3 py-12">{transaction !== null && numberFormat(transaction.amount)}</div>
					</div>
				</div>
				<div className="flex space-x-6 items-center mt-7">
					<button
						onClick={submitHandle}
						type="button"
						className="rounded-md bg-primary px-6 py-3 text-white font-anenirHeavy  uppercase focus:outline-none hover:bg-pink transition hover:text-black"
					>
						Bekreft betaling
					</button>
					<button
						onClick={backHandle}
						className="bg-white p-3 rounded-lg border border-black uppercase font-anenirHeavy text-black transition w-32 text-center hover:bg-pink block"
					>
						Avbryt
					</button>
				</div>
			</section>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	transaction: state.transaction,
	user: state.user,
});

export default connect(mapStateToProps)(PaymentReview);
