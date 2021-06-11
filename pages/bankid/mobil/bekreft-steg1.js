import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, connect } from 'react-redux';

import Header from './../../../components/Header';
import { createPayment, setAccount } from './../../../redux/actions/accountsAction';
import { taskPaymentCreated } from './../../../redux/actions/taskAction';
import { setTransaction } from './../../../redux/actions/transactionAction';

const MobileValidation = ({ transaction }) => {
  const containerRef = useRef();
  const sidePanel = useRef();

  const [errorPinID, setErrorPinID] = useState(false);
  const [screen, setScreen] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const pinID = 1386;

  const wordsArray1 = ['GLAD', 'MORSOM', 'POSITIV', 'NYSGJERRIG', 'LEKKER', 'LOVLIG', 'ROLIG', 'UNG', 'GAMMEL', 'STILIG'];
  const wordsArray2 = ['HEST', 'HIPSTER', 'STJERNE', 'BURSDAG', 'FEST', 'BIL', 'DINOSAUR', 'KOMPIS', 'HJELPER', 'LUNSJ'];

  function getRandomWords() {
    return Math.floor(Math.random() * 10);
  }

  const wordFirst = wordsArray1[getRandomWords()];
  const wordSecond = wordsArray2[getRandomWords()];

  useEffect(() => {
    if (transaction === null) {
      router.push('/overfore');
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

  const acceptHandle = () => {
    setScreen(2);
  };
  const sendHandle = () => {
    let pinIdVal = containerRef.current.querySelector('input[name="pinId"]').value;
    if (pinIdVal === '') {
      setErrorPinID('Fyll inn PIN-kode.');
      return;
    }
    if (pinID !== parseInt(pinIdVal)) {
      setErrorPinID('Skriv inn riktig kode.');
      return;
    }
    setErrorPinID(false);

    const data = {
      selectedAccountName: transaction.selectedAccountName,
      selectedAccountNumber: transaction.selectedAccountNumber,
      transferAccountNumber: transaction.transferAccountNumber,
      amount: transaction.amount,
      details: transaction.details,
      type: transaction.type,
    };

    dispatch(createPayment(data));
    dispatch(setAccount(transaction.selectedAccountName));
    dispatch(taskPaymentCreated());
    dispatch(setTransaction(null));
    router.push('/oversikt');
  };
  const handleBlack = () => {
    router.push('/bekreft-betaling');
  };
  return (
    <>
      <Header />
      <section className="py-20 min-h-screen flex flex-col justify-center">
        <div className="container max-w-[800px] flex my-6 space-x-6 duration-500 transition-max-width" ref={containerRef}>
          <div className="w-2/3 xl:w-[800px] bg-white px-10 py-10 shadow-md">
            <h1 className="mb-6">Bekreft betaling med BankID på mobil</h1>
            <div className="border border-gray-300 px-8 py-12 mb-5 min-h-[550px]">
              {screen === 1 && (
                <div className="mb-9">
                  <strong className="font-anenirHeavy block text-xl">Referanse</strong>
                  <div className="text-2rem text-primary uppercase font-anenirHeavy my-2">
                    {wordFirst} {wordSecond}
                  </div>
                  <strong className="font-anenirHeavy block text-xl">Vennligst følg instruksjonen på mobilen.</strong>
                </div>
              )}
              {screen === 2 && (
                <div className="mb-9">
                  <strong className="font-anenirHeavy block text-xl">Tast inn “din” personlige kode: </strong>
                  <div className="text-2rem text-primary uppercase font-anenirHeavy my-2">{pinID}</div>
                  <strong className="font-anenirHeavy block text-xl">i mobiltelefonen på høyre side</strong>
                </div>
              )}
            </div>
          </div>
          <div
            className="border border-secondary bg-[#CEEBF5] p-[40px] xl:w-[325px] w-1/3 relative hidden opacity-0 transition duration-300"
            ref={sidePanel}
          >
            <div className="intro-text transition duration-300 h-full flex justify-center items-center flex-col">
              <div className="w-[204px] relative">
                <img src={require('./../../../img/mobile.png')} className="w-full" alt="" />
                {screen === 1 && (
                  <>
                    <div className="absolute top-2/4 left-0 w-full p-4 text-center text-white transform -translate-y-2/4 text-base -mt-8">
                      Bekreft referanse {wordFirst} {wordSecond} for BankID identifisering
                    </div>
                    <div className="flex absolute bottom-1 left-0 w-full p-6">
                      <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" onClick={handleBlack}>
                        Avbryt
                      </button>
                      <button
                        className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF] ml-auto"
                        onClick={acceptHandle}
                      >
                        Godta
                      </button>
                    </div>
                  </>
                )}
                {screen === 2 && (
                  <div className="absolute top-2/4 left-0 w-full p-7 text-center text-white transform -translate-y-2/4 text-base flex justify-center flex-col">
                    <span>Tast ID-PIN (4 sifre)</span>
                    <input
                      type="number"
                      name="pinId"
                      className="number-field focus:outline-none bg-white w-full h-14 my-3 p-3 text-center text-black text-xl"
                    ></input>
                    {errorPinID && <div className="text-red-600 text-sm mb-2">{errorPinID}</div>}
                    <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" onClick={sendHandle}>
                      Send
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button className="text-black w-6 h-6 absolute top-3 right-3 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});
export default connect(mapStateToProps)(MobileValidation);
