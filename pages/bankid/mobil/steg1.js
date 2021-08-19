import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import HeaderSecondary from '../../../components/HeaderSecondary';
import setUser from './../../../redux/actions/userAction';

const Mobile1 = () => {
  const containerRef = useRef();
  const sidePanel = useRef();
  const formRef = useRef();
  const [errorMobileNumber, setErrorMobileNumber] = useState(false);
  const [errorDateBirth, setErrorDateBirth] = useState(false);
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

  const containerAnimation = (type) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (type === 'IN') {
          containerRef.current.style.maxWidth = '1215px';
        } else {
          containerRef.current.style.maxWidth = '800px';
        }
        setTimeout(() => {
          resolve(true);
        }, 500);
      }, 100);
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const mobileNumber = formRef.current.querySelector('input[name="mobileNumber"]').value;
    const birthDate = formRef.current.querySelector('input[name="birthDate"]').value;

    if (mobileNumber === '' || mobileNumber.length !== 8) {
      setErrorMobileNumber('Skriv inn 8 siffer.');
      return;
    }
    setErrorMobileNumber(false);
    if (birthDate === '' || birthDate.length !== 6) {
      setErrorDateBirth('Skriv inn 6 siffer.');
      return;
    }

    setErrorDateBirth(false);

    containerAnimation('IN').then(() => {
      sidePanel.current.classList.remove('hidden');
      setTimeout(() => {
        sidePanel.current.style.opacity = 1;
        setScreen(2);
      }, 50);
    });
  };

  const acceptHandle = () => {
    setScreen(3);
  };
  const sendHandle = () => {
    let pinIdVal = containerRef.current.querySelector('input[name="pinId"]').value;
    if (pinIdVal === '') {
      setErrorPinID('Skriv inn riktig kode.');
      return;
    }
    if (pinID !== parseInt(pinIdVal)) {
      setErrorPinID('Skriv inn riktig kode.');
      return;
    }
    setErrorPinID(false);
    dispatch(setUser('mobil'));
    router.push('/konto');
  };
  const backHandle = () => {
    if (screen === 1) {
      router.push('/steg1');
      return;
    }
    if (screen === 2) {
      containerAnimation('OUT').then(() => {
        sidePanel.current.style.opacity = 0;
        setTimeout(() => {
          sidePanel.current.classList.add('hidden');
        }, 300);
      });
    }
    setScreen(screen - 1);
  };
  return (
    <>
      <HeaderSecondary />
      {console.log(screen)}
      <section className="py-20 min-h-screen flex flex-col justify-center">
        <div className="container max-w-[800px] flex my-6 space-x-6 duration-500 transition-max-width" ref={containerRef}>
          <div className="w-2/3 xl:w-[800px] bg-white px-10 py-10 shadow-md">
            <h1 className="mb-6">Logg inn med BankID på mobil</h1>
            <div className="border border-gray-300 px-8 py-12 mb-5 min-h-[550px]">
              {screen === 1 && (
                <form onSubmit={submitHandle} ref={formRef}>
                  <fieldset className="max-w-[278px]">
                    <div className="mb-8">
                      <label className="text-xl block mb-3">Mobilnummer</label>
                      <input
                        type="number"
                        placeholder="Ditt mobilnummer (8 siffer)"
                        name="mobileNumber"
                        className="number-field focus:outline-none border border-gray-300 px-3 py-2 text-xl w-full"
                      />
                    </div>
                    {errorMobileNumber && <div className="text-red-1100 text-lg mb-6 -mt-6">{errorMobileNumber}</div>}
                    <div className="mb-8">
                      <label className="text-xl block mb-3">Fødselsdato</label>
                      <input
                        type="text"
                        placeholder="Din fødselsdato (ddmmåå)"
                        name="birthDate"
                        className="number-field focus:outline-none border border-gray-300 px-3 py-2 text-xl w-full"
                      />
                    </div>
                    {errorDateBirth && <div className="text-red-1100 text-lg mb-6 -mt-6">{errorDateBirth}</div>}
                    <div className="w-32 text-center">
                      <button
                        type="submit"
                        className="rounded-md bg-primary p-3 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition w-full"
                      >
                        Neste
                      </button>
                      <span className="block text-xl my-4">eller</span>
                    </div>
                  </fieldset>
                </form>
              )}

              {screen === 2 && (
                <div className="mb-9">
                  <strong className="font-anenirHeavy block text-xl">Referanse</strong>
                  <div className="text-2rem text-primary uppercase font-anenirHeavy my-2">
                    {wordFirst} {wordSecond}
                  </div>
                  <p className="text-xl">Vennligst følg instruksjonen på mobilen.</p>
                </div>
              )}
              {screen === 3 && (
                <div className="mb-9">
                  <strong className="font-anenirHeavy block text-xl">Tast inn “din” personlige kode: </strong>
                  <div className="text-2rem text-primary uppercase font-anenirHeavy my-2">{pinID}</div>
                  <strong className="font-anenirHeavy block text-xl">i mobiltelefonen på høyre side</strong>
                </div>
              )}
              {screen < 3 && (
                <button
                  type="button"
                  onClick={backHandle}
                  className="bg-secondary p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-white block"
                >
                  Avbryt
                </button>
              )}
            </div>
          </div>
          <div
            className="border border-gray-1100 bg-blue-50 p-[40px] xl:w-[325px] w-1/3 relative hidden opacity-0 transition duration-300"
            ref={sidePanel}
          >
            <div className="intro-text transition duration-300 h-full flex justify-center items-center flex-col">
              <p className="mb-10 text-sm">
                Bruk denne virtuelle mobilen når du skal løse oppgavene. Bekreft at teksten på PC-skjermen og på mobilen er den samme ved å klikke på
                «{screen === 3 ? 'Send' : 'Godta'}» nederst til høyre på mobilskjermen.
              </p>
              <div className="w-[204px] relative">
                <img src={require('./../../../img/mobile.png')} className="w-full" alt="" />
                {screen === 2 && (
                  <>
                    <div className="absolute top-2/4 left-0 w-full p-4 text-center text-white transform -translate-y-2/4 text-base -mt-8">
                      Bekreft referanse {wordFirst} {wordSecond} for BankID identifisering
                    </div>
                    <div className="flex absolute bottom-1 left-0 w-full p-6">
                      <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" onClick={backHandle}>
                        Avbryt
                      </button>
                      <button
                        className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF] ml-auto focus:outline-none"
                        onClick={acceptHandle}
                      >
                        Godta
                      </button>
                    </div>
                  </>
                )}
                {screen === 3 && (
                  <div className="absolute top-2/4 left-0 w-full p-7 text-center text-white transform -translate-y-2/4 text-base flex justify-center flex-col">
                    <span>Tast ID-PIN (4 sifre)</span>
                    <input
                      type="number"
                      name="pinId"
                      className="number-field focus:outline-none bg-white w-full h-14 my-3 p-3 text-center text-black text-xl"
                    ></input>
                    {errorPinID && <div className="text-white text-sm mb-2 bg-red-1100 p-2">{errorPinID}</div>}

                    <div className="flex justify-center w-full space-x-6">
                      <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" onClick={backHandle}>
                        Avbryt
                      </button>
                      <button className="bg-none border-0 focus:outline-none text-base font-anenirHeavy text-[#FEC8AF]" onClick={sendHandle}>
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mobile1;
