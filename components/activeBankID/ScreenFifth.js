import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setError } from './../../redux/actions/activeBankIdAction';
import Loader from './../loader';

const ScreenFifth = () => {
  const containerRef = useRef();
  const sidePanel = useRef();
  const [step, setStep] = useState(1);
  const { screen, error } = useSelector((state) => state.activeBankId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (step > 1) {
      const containerAnimation = new Promise((resolve, reject) => {
        if (containerRef.current !== null) {
          containerRef.current.style.maxWidth = '1215px';
          setTimeout(() => {
            resolve(true);
          }, 500);
        }
      });
      containerAnimation.then(() => {
        if (sidePanel.current !== null) {
          sidePanel.current.classList.remove('hidden');
          setTimeout(() => {
            sidePanel.current.style.opacity = 1;
          }, 50);
        }
      });
    } else {
      containerRef.current.style.maxWidth = '790px';
    }
  }, [step]);

  const submitHandle = (e) => {
    e.preventDefault();

    setStep(2);
    dispatch(setError(false));
  };
  const handleBack = () => {
    // sidePanel.current.style.opacity = 0;
    // setTimeout(() => {
    //   sidePanel.current.classList.add('hidden');
    //   containerRef.current.style.maxWidth = '790px';

    // }, 400);
    dispatch(setScreen(screen - 1));
  };
  const pinID = 86548632;
  const sendHandle = (e) => {
    e.preventDefault();
    const pinIdVal = e.target.pinId;
    if (pinIdVal.value === '' || pinID !== parseInt(pinIdVal.value)) {
      dispatch(setError('Skriv inn riktig kode.'));
      return;
    }
    dispatch(setError(false));
    dispatch(setScreen(screen + 1));
  };

  return (
    <div className="container max-w-[791px] flex my-6 space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
      <div className="lg:w-[800px] bg-white px-10 py-10 shadow-md">
        <h1 className="mb-6">Bestill BankID p?? mobil</h1>

        <div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-medium mb-3">Klar til aktivering</h2>
              <p className="max-w-xs pb-7">
                Du er n?? klar til ?? fortsette aktiveringen p?? mobiltelefonen. Klikk p?? ???fortsett??? og f??lg anvisningene n??ye.
              </p>
              <p className="max-w-xs pb-3">Aktiveringsprosessen kan ta 2-3 minutter.</p>

              <div className="w-32 text-center">
                <button
                  type="button"
                  className="rounded-md bg-primary p-3 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition w-full"
                  onClick={submitHandle}
                >
                  Fortsett
                </button>
                <span className="block text-xl my-4">eller</span>
                <button
                  type="button"
                  className="bg-white p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-pink block focus:outline-none"
                  onClick={handleBack}
                >
                  Avbryt
                </button>
              </div>
            </>
          )}
          {step === 2 && <h2 className="text-xl font-medium mb-3">F??lg anvisningen p?? mobiltelefonen til h??yre.</h2>}
          {step === 3 && (
            <>
              <h2 className="text-xl font-medium">F??lg anvisningen p?? mobiltelefonen til h??yre.</h2>
              <div className="text-2rem text-primary uppercase font-anenirHeavy my-2">{pinID}</div>
              <h2 className="text-xl font-medium">F??lg anvisninger mobiltelefonen til h??yre.</h2>
            </>
          )}
        </div>
      </div>
      {step > 1 && (
        <div className="border border-gray-1100 bg-blue-50 p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="w-[204px] relative">
              <img src={require('./../../img/mobile.png')} className="w-full" alt="" />

              {step === 2 && (
                <div className="absolute top-0 left-0 bottom-0 right-0 text-center p-5 flex justify-center items-center flex-col">
                  <p className="text-white">
                    Du skal n?? aktivere BankID p?? mobil ved ?? taste inn aktiveringskoden i neste skjermbilde. Bekreft for ?? g?? videre.{' '}
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
                      onClick={() => setStep(step - 1)}
                    >
                      Avbryt
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="absolute top-0 left-0 bottom-0 right-0 text-center p-5 flex justify-center items-center flex-col">
                  <p className="text-white">Tast inn aktiveringskoden du har f??tt oppgitt i nettbanken:</p>
                  <div className="flex flex-col mt-10">
                    <form onSubmit={sendHandle}>
                      <label className="text-white block">Tast inn kode (8 sifre)</label>
                      <input
                        type="number"
                        name="pinId"
                        className="number-field focus:outline-none bg-white w-full h-14 my-3 p-3 text-center text-black text-xl"
                      ></input>
                      {error && <div className="text-white text-sm mb-2 bg-red-1100 p-2">{error}</div>}

                      <div className="flex justify-center space-x-7">
                        <button
                          className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]"
                          onClick={() => setStep(step - 1)}
                        >
                          Avbryt
                        </button>
                        <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" type="submit">
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenFifth;
