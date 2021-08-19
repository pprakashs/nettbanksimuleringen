import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import HeaderSecondary from '../../../components/HeaderSecondary';
import setUser from './../../../redux/actions/userAction';
import { getRandomKey } from './../../../util/getRandomNumber';

const Step2 = () => {
  const containerRef = useRef();
  const sidePanel = useRef();
  const formRef = useRef();
  const formRef2 = useRef();
  const [error, setError] = useState(false);
  const [screen, setScreen] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const keyCode = getRandomKey();

  useEffect(() => {
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

  const submitHandle = (e) => {
    e.preventDefault();
    const val = formRef.current.querySelector('input[name="accountNumber"]').value;
    const introText = sidePanel.current.querySelector('.intro-text');
    const keyBlock = sidePanel.current.querySelector('.key-block');
    if (val === '' || val.length !== 11) {
      setError(true);
      return;
    }
    setError(null);
    const sideBarAnimation = new Promise((resolve, reject) => {
      introText.classList.add('opacity-0');
      setTimeout(() => {
        introText.classList.add('hidden');
        resolve(true);
      }, 320);
    });
    sideBarAnimation.then(() => {
      keyBlock.classList.remove('hidden');
      keyBlock.classList.remove('opacity-0');
      setScreen(2);
    });
  };

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
    setError(null);
    dispatch(setUser('tekst'));
    router.push('/konto');
  };

  return (
    <>
      <HeaderSecondary />

      <section className="py-20 min-h-screen flex flex-col justify-center">
        <div className="container max-w-[791px] flex my-6 space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
          <div className="lg:w-[800px] bg-white px-10 py-10 shadow-md">
            <h1 className="mb-6">Logg inn med BankID med kodebrikke</h1>

            <div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
              {screen === 1 ? (
                <form onSubmit={submitHandle} ref={formRef}>
                  <div className="flex items-center mb-5">
                    <span className="border-2 border-primary rounded-full w-8 h-8 justify-center items-center flex font-bold text-blue text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10.08" height="17.568" viewBox="0 0 10.08 17.568">
                        <path
                          id="Path_35"
                          data-name="Path 35"
                          d="M18.54,19.248V17.784a5.091,5.091,0,0,1,.1-1.08,2.914,2.914,0,0,1,.288-.78,3.019,3.019,0,0,1,.516-.672q.324-.324.8-.78.384-.36.768-.732a7.739,7.739,0,0,0,.7-.768,4.162,4.162,0,0,0,.516-.84,2.358,2.358,0,0,0,.2-1,2.525,2.525,0,0,0-.2-1.02,2.582,2.582,0,0,0-.54-.8,2.423,2.423,0,0,0-.8-.528,2.6,2.6,0,0,0-1-.192,2.558,2.558,0,0,0-1.908.744A3.228,3.228,0,0,0,17.1,11.28l-2.448-.24a5.057,5.057,0,0,1,1.74-3.276,5.349,5.349,0,0,1,3.54-1.188,5.777,5.777,0,0,1,1.884.3,4.527,4.527,0,0,1,1.524.864,3.979,3.979,0,0,1,1.02,1.392,4.551,4.551,0,0,1,.372,1.884,4.419,4.419,0,0,1-.264,1.6,4.836,4.836,0,0,1-.744,1.284l-1.44,1.488-.24.216q-.384.36-.612.612a2.21,2.21,0,0,0-.36.528,2.1,2.1,0,0,0-.18.612,6.1,6.1,0,0,0-.048.84v1.056Zm-.456,3.312a1.6,1.6,0,1,1,.468,1.116A1.524,1.524,0,0,1,18.084,22.56Z"
                          transform="translate(-14.652 -6.576)"
                          fill="#0025A0"
                        />
                      </svg>
                    </span>
                    <span className="text-xl ml-5">Fødselsnummer</span>
                  </div>
                  <div className="flex">
                    <input
                      type="number"
                      name="accountNumber"
                      className={`${
                        error ? 'border-red-1100' : 'border-primary'
                      } border-2  p-3 text-xl block number-field focus:outline-none h-13 w-72`}
                      placeholder="11 siffer"
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
                  {error && <div className="text-red-1100 pt-2 text-xl">Fødselsnummer må inneholde 11 siffer.</div>}
                </form>
              ) : (
                <form onSubmit={submitHandleScreen2} ref={formRef2}>
                  <h3 className="text-xl mb-1">Engangskode</h3>
                  <label className="text-xl mb-3 block">Skriv inn tallene fra kodebrikken</label>
                  <div className="flex">
                    <input
                      type="number"
                      name="keyCode"
                      className={`${
                        error ? 'border-red-1100' : 'border-primary'
                      } border-2  p-3 text-xl block number-field focus:outline-none h-13 w-72`}
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
                  {error && <div className="text-red-1100 pt-2 text-xl">{error}</div>}
                </form>
              )}
            </div>
          </div>
          <div className="border border-gray-1100 bg-blue-50 p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
            <div className="intro-text transition duration-300">
              <h1 className="mb-5">Oppgavetekst</h1>
              <p className="text-base max-w-[250px]">
                Skriv inn ditt eget eller et fiktivt fødselsnummer. Husk at det skal være 11 siffer i et fødselsnummer. Ingen informasjon du skriver
                inn blir lagret.
              </p>

              <button className="text-black w-6 h-6 absolute top-3 right-3 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="key-block h-full hidden transition opacity-0 duration-300">
              <div className="flex h-full justify-center items-center">
                <div className="relative">
                  <img src={require('./../../../img/signering_kodebrikke2@2x.png')} alt="" />
                  <div className="bg-none bg-transparent border-0 absolute text-white top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 w-24 text-center text-2xl focus:outline-none">
                    {screen === 2 && keyCode}
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

export default Step2;
