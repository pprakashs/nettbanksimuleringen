import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setError, setPinCode } from './../../redux/actions/activeBankIdAction';

const ScreenSixth = () => {
  const sidePanel = useRef();
  const [step, setStep] = useState(1);
  const { screen, error, pinCode } = useSelector((state) => state.activeBankId);

  const dispatch = useDispatch();

  function stepTimeout(step) {
    setTimeout(() => {
      setStep(step);
    }, 3000);
  }

  useEffect(() => {
    sidePanel.current.classList.remove('hidden');
    setTimeout(() => {
      sidePanel.current.style.opacity = 1;
    }, 50);
    if (step === 5) {
      setTimeout(() => {
        dispatch(setScreen(screen + 1));
      }, 3000);
    }
    if (step === 1) {
      stepTimeout(2);
    }
  }, [step]);

  const sendHandle = (e) => {
    e.preventDefault();
    const pinCodeInput = e.target.pinCode;

    if (pinCodeInput.value === '' || pinCodeInput.value.length < 4 || pinCodeInput.value.length > 8) {
      dispatch(setError('Skriv inn riktig kode.'));
      return;
    }
    dispatch(setError(false));
    dispatch(setPinCode(Number(pinCodeInput.value)));
    setStep(step + 1);
  };
  const repeatSendHandle = (e) => {
    e.preventDefault();
    const pinCodeRepeatInput = e.target.pinCodeRepeat;
    if (pinCode !== Number(pinCodeRepeatInput.value)) {
      dispatch(setError('Feil PIN-kode.'));
      return;
    }
    dispatch(setError(false));
    setStep(step + 1);
  };
  return (
    <div className="container max-w-[791px] flex flex-col my-6 justify-center items-center">
      <div
        className="border border-secondary bg-[#CEEBF5] p-[40px] w-[325px] relative hidden opacity-0 transition duration-300 py-20"
        ref={sidePanel}
      >
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-[204px] relative">
            <img src={require('./../../img/mobile.png')} className="w-full" alt="" />
            <div className="absolute top-0 left-0 bottom-0 right-0 text-center p-4 flex justify-center items-center flex-col">
              {step === 1 || step === 5 ? <div className="text-white loading-dots">Sender melding</div> : null}
              {step === 2 && (
                <div className="flex justify-center items-center flex-col">
                  <p className="text-white">
                    Du skal nå aktivere BankID på mobil ved å taste inn aktiveringskoden i neste skjermbilde. Bekreft for å gå videre.{' '}
                  </p>
                  <div className="flex flex-col mt-14">
                    <button
                      className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]"
                      onClick={() => setStep(step + 1)}
                    >
                      Bekreft
                    </button>
                    <button
                      className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF] ml-auto focus:outline-none mt-5"
                      onClick={() => dispatch(setScreen(screen - 1))}
                    >
                      Avbryt
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="flex flex-col">
                  <form onSubmit={sendHandle}>
                    <label className="text-white block text-base">Lag PIN-kode (4-8 sifre)</label>
                    <input
                      type="number"
                      name="pinCode"
                      className="number-field focus:outline-none bg-white w-full h-14 my-3 p-3 text-center text-black text-xl"
                    ></input>
                    {error && <div className="text-white text-sm mb-2 bg-red-600 p-2">{error}</div>}
                    <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              )}
              {step === 4 && (
                <div className="flex flex-col">
                  <form onSubmit={repeatSendHandle}>
                    <label className="text-white block text-base">Gjenta valgt PIN-kode</label>
                    <input
                      type="number"
                      name="pinCodeRepeat"
                      className="number-field focus:outline-none bg-white w-full h-14 my-3 p-3 text-center text-black text-xl"
                    ></input>
                    {error && <div className="text-white text-sm mb-2 bg-red-600 p-2">{error}</div>}
                    <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenSixth;
