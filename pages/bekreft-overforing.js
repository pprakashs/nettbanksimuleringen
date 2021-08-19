import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { numberFormat } from './../util/numberFormat';
import { transferPayment, setAccount } from './../redux/actions/accountsAction';
import { taskTransferCrated } from './../redux/actions/taskAction';
import { setTransaction } from './../redux/actions/transactionAction';
import { taskTransferPanel } from './../redux/actions/taskAction';

import Layout from '../components/Layout';

const TransferReview = ({ transaction }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (transaction === null) router.push('/overfore');
  }, []);

  const submitHandle = () => {
    dispatch(transferPayment(transaction));
    dispatch(setAccount(transaction.transferForm.accountName));
    dispatch(taskTransferCrated());
    dispatch(setTransaction(null));
    router.push('/oversikt');
  };

  const backHandle = () => {
    dispatch(taskTransferPanel(true));
    router.push('/overfore');
  };

  return (
    <Layout>
      <section className="bg-white px-7 shadow-md py-10 pb-24 text-base lg:text-xl">
        <h1 className="mb-6">Overføring mellom egne kontoer</h1>

        <div className="border border-black-100">
          <div className="bg-[#E0E0E0]">
            <div className="w-3/5 font-anenirHeavy lg:px-5 px-3 py-2">Overføre fra konto</div>
          </div>
          <div className="border-t border-black-100 bg-pink">
            <div className="w-3/5 lg:px-5 px-3 py-12">
              {transaction !== null && (
                <>
                  <strong className="font-anenirHeavy">{transaction.transferForm.accountNumber}</strong> {transaction.transferForm.accountName}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border border-black-100 border-t-0">
          <div className="bg-[#E0E0E0] flex">
            <div className="w-1/2 font-anenirHeavy lg:px-5 px-3 py-2">Overføre til konto</div>
          </div>
          <div className="border-t border-black-100 bg-pink">
            <div className="w-3/5 lg:px-5 px-3 py-12">
              {transaction !== null && (
                <>
                  <strong className="font-anenirHeavy">{transaction.transferTo.accountNumber}</strong> {transaction.transferTo.accountName}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border border-black-100 border-t-0">
          <div className="bg-[#E0E0E0] flex">
            <div className="w-2/3 border-black-100 font-anenirHeavy lg:px-5 px-3 py-2">Egen kommentar</div>
            <div className="w-2/6 border-l border-black-100 lg:px-5 px-3 py-2">
              <strong className="font-anenirHeavy">Beløp</strong> (kr og øre)
            </div>
          </div>

          <div className="flex border-t border-black-100 bg-pink">
            <div className="w-2/3 lg:px-5 px-3 py-12 border-black-100">{transaction !== null && transaction.details}</div>
            <div className="w-2/6 border-l border-black-100 lg:px-5 px-3 py-12">{transaction !== null && numberFormat(transaction.amount)}</div>
          </div>
        </div>
        <div className="flex space-x-6 items-center mt-7">
          <button
            onClick={submitHandle}
            type="button"
            className="rounded-md bg-primary px-6 py-3 text-white font-anenirHeavy  uppercase focus:outline-none hover:bg-pink transition hover:text-black"
          >
            bekreft overføring
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
});

export default connect(mapStateToProps)(TransferReview);
