import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setError } from './../../redux/actions/activeBankIdAction';

const ScreenEight = () => {
  const sidePanel = useRef();
  const [step, setStep] = useState(1);
  const { screen, error, pinCode } = useSelector((state) => state.activeBankId);

  const dispatch = useDispatch();

  useEffect(() => {
    sidePanel.current.classList.remove('hidden');
    setTimeout(() => {
      sidePanel.current.style.opacity = 1;
    }, 50);
    if (step === 2) {
      setTimeout(() => {
        dispatch(setScreen(screen + 1));
      }, 3000);
    }
  }, [step]);

  const sendHandle = (e) => {
    e.preventDefault();

    const inputPinCode = e.target.pinCode;
    if (Number(inputPinCode.value) !== pinCode) {
      dispatch(setError('Skriv inn riktig kode.'));
      return;
    }
    dispatch(setError(false));
    setStep(2);
  };
  return (
    <div className="container max-w-[791px] flex flex-col my-6 justify-center items-center">
      <div className="border border-gray-1100 bg-blue-50 p-[40px] w-[325px] relative hidden opacity-0 transition duration-300 py-20" ref={sidePanel}>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-[204px] relative">
            <img src={require('./../../img/mobile.png')} className="w-full" alt="" />
            <div className="absolute top-0 left-0 bottom-0 right-0 text-center p-5 flex justify-center items-center flex-col">
              <div className="flex flex-col">
                {step === 1 && (
                  <form onSubmit={sendHandle}>
                    <label className="text-white block text-base">Tast inn kode</label>
                    <input
                      type="number"
                      name="pinCode"
                      className="number-field focus:outline-none bg-white w-full h-14 my-3 p-3 text-center text-black text-xl"
                    ></input>
                    {error && <div className="text-white text-sm mb-2 bg-red-1100 p-2">{error}</div>}
                    <div className="flex justify-center space-x-8">
                      <button
                        className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF] focus:outline-none"
                        onClick={() => dispatch(setScreen(screen - 1))}
                      >
                        Avbryt
                      </button>
                      <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" type="submit">
                        Send
                      </button>
                    </div>
                  </form>
                )}
                {step === 2 && <div className="text-white loading-dots">Sender melding</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenEight;
