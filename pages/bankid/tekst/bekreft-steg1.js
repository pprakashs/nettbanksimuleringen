import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, connect } from 'react-redux';

import Header from './../../../components/Header';
import { createPayment, setAccount } from './../../../redux/actions/accountsAction';
import { taskPaymentCreated } from './../../../redux/actions/taskAction';
import { setTransaction } from './../../../redux/actions/transactionAction';
import { getRandomKey } from './../../../util/getRandomNumber';

const TextValidation = ({ transaction }) => {
  const containerRef = useRef();
  const sidePanel = useRef();
  const formRef2 = useRef();
  const [error, setError] = useState(false);
  const router = useRouter();
  const keyCode = getRandomKey();
  const dispatch = useDispatch();

  useEffect(() => {
    if (transaction === null) {
      router.push('/betaling');
      return;
    }
    const containerAnimation = new Promise((resolve, reject) => {
      setTimeout(() => {
        containerRef.current.style.maxWidth = '1215px';

        setTimeout(() => {
          resolve(true);
        }, 500);
      }, 100);
    });
    containerAnimation.then(() => {
      sidePanel.current.classList.remove('hidden');
      setTimeout(() => {
        sidePanel.current.style.opacity = 1;
      }, 50);
    });
  }, []);

  const submitHandleScreen2 = (e) => {
    e.preventDefault();
    const val = formRef2.current.querySelector('input[name="keyCode"]').value;
    if (val === '') {
      setError('Vennligst fyll inn koden fra kodebrikken.');
      return;
    }
    if (val !== keyCode) {
      setError('Koden må stemme med kodebrikken.');
      return;
    }

    const data = {
      selectedAccountName: transaction.selectedAccountName,
      selectedAccountNumber: transaction.selectedAccountNumber,
      transferAccountNumber: transaction.transferAccountNumber,
      amount: transaction.amount,
      details: transaction.details,
      type: transaction.type,
    };

    setError(null);
    dispatch(createPayment(data));
    dispatch(setAccount(transaction.selectedAccountName));
    dispatch(taskPaymentCreated());
    dispatch(setTransaction(null));
    router.push('/oversikt');
  };

  return (
    <>
      <Header />
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-8">
        <div className="container max-w-[791px] flex space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
          <div className="lg:w-[800px] bg-white px-10 py-10 shadow-md">
            <h1 className="mb-6">Bekreft betaling med BankID med kodebrikke</h1>

            <div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
              <form onSubmit={submitHandleScreen2} ref={formRef2}>
                <h3 className="text-xl mb-1">Engangskode</h3>
                <label className="text-xl mb-3 block">Skriv inn tallene fra kodebrikken</label>
                <div className="flex">
                  <input
                    type="number"
                    name="keyCode"
                    className="border-2 border-primary p-3 text-xl block number-field focus:outline-none h-13 w-72"
                    placeholder="6 siffer"
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
                {error && <div className="text-red-1100 pt-3 text-xl">{error}</div>}
              </form>
            </div>
          </div>
          <div className="border border-secondary bg-[#CEEBF5] p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
            <div className="key-block h-full">
              <div className="flex h-full justify-center items-center">
                <div className="relative">
                  <img src={require('./../../../img/signering_kodebrikke2@2x.png')} alt="" />
                  <div className="bg-none bg-transparent border-0 absolute text-white top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 w-24 text-center text-2xl focus:outline-none">
                    {keyCode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps)(TextValidation);
