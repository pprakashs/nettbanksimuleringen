import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setError } from './../../redux/actions/activeBankIdAction';

const ScreenNine = () => {
  const containerRef = useRef();
  const sidePanel = useRef();
  const [step, setStep] = useState(1);

  const router = useRouter();

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

    function finalStep(cb) {
      setTimeout(() => {
        setStep(2);
        setTimeout(() => {
          cb();
        }, 20);
      }, 3000);
    }
    finalStep(() => {
      sidePanel.current.querySelector('.popup').classList.remove('opacity-0');
      sidePanel.current.querySelector('.popup').classList.remove('scale-75');
      containerRef.current.querySelector('.final-button').classList.remove('opacity-0');
      containerRef.current.querySelector('.final-button').classList.remove('translate-y-3');
    });
  }, []);

  const handleClick = () => {
    dispatch(setError(false));
    router.push('/konto');
  };

  return (
    <div className="container max-w-[791px] flex my-6 space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
      <div className="lg:w-[800px] bg-white px-10 py-10 shadow-md left-content transition">
        <h1 className="mb-6">Bestilling fullført</h1>

        <div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
          <h2 className="font-medium text-xl mb-8 max-w-md">
            Du vil om kort tid motta en SMS. Når SMS er mottatt kan du logge ut av nettbanken og logge inn på nytt med din BankID på mobil.
          </h2>
          {step === 2 && (
            <button
              type="submit"
              className="rounded-md bg-primary p-3 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition px-7 opacity-0 transition duration-500 final-button transform translate-y-3 duration-500"
              onClick={handleClick}
            >
              Avslutt
            </button>
          )}
        </div>
      </div>
      <div className="border border-gray-1100 bg-blue-50 p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-[204px] relative">
            <img src={require('./../../img/mobile.png')} className="w-full" alt="" />

            <div className="absolute top-0 left-0 bottom-0 right-0 text-center p-4 flex justify-center items-center flex-col text-white">
              {step === 1 && <div>Takk for din bestilling. Du vil motta en SMS fra oss når din BankID på mobil er klar til bruk.</div>}
              {step === 2 && (
                <div className="bg-white rounded-lg p-4 text-black text-left opacity-0 transition duration-500 popup scale-75 transform">
                  <p className="mb-4">
                    <strong>SMS:</strong> BankID
                  </p>
                  <p>
                    Hei! Din BankID
                    <br /> på mobil er
                    <br /> aktivert og klar
                    <br /> til bruk.{' '}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenNine;
