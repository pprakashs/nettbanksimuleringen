import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setError } from './../../redux/actions/activeBankIdAction';

const getRandomKey = () => {
  var x = '';
  for (var i = 0; i < 6; i++) {
    x += Math.floor(Math.random() * 6) + 1;
  }
  if (x === '123456') {
    x = '';
    for (var i = 0; i < 6; i++) {
      x += Math.floor(Math.random() * 6) + 1;
    }
  }
  return x;
};

const ScreenThird = () => {
  const containerRef = useRef();
  const sidePanel = useRef();
  const dispatch = useDispatch();
  const { screen, error } = useSelector((state) => state.activeBankId);
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
    const val = e.target.keyCode.value;
    if (val === '') {
      dispatch(setError('Vennligst fyll inn koden fra kodebrikken.'));
      return;
    }
    if (val !== keyCode) {
      dispatch(setError('Koden må stemme med kodebrikken.'));
      return;
    }
    sidePanel.current.style.opacity = 0;
    setTimeout(() => {
      dispatch(setError(false));
      dispatch(setScreen(screen + 1));
    }, 400);
  };
  return (
    <div className="container max-w-[791px] flex my-6 space-x-6 transition duration-500 transition-max-width" ref={containerRef}>
      <div className="lg:w-[800px] bg-white px-10 py-10 shadow-md">
        <h1 className="mb-6">Bekreft handlingen med kodebrikke</h1>

        <div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
          <h2 className="text-2xl font-medium mb-8 max-w-[470px]">Vennligst bekreft handlingen med ny kode fra kodebrikken før du går videre. </h2>

          <form onSubmit={submitHandle}>
            <label className="max-w-xs mb-3 block text-xl">Skriv inn tallene fra kodebrikken</label>
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
            {error && <div className="text-red-600 pt-3 text-xl mt-2">{error}</div>}
          </form>
        </div>
      </div>
      <div className="border border-secondary bg-[#CEEBF5] p-[40px] w-[325px] relative hidden opacity-0 transition duration-300" ref={sidePanel}>
        <div className="key-block h-full">
          <div className="flex h-full justify-center items-center">
            <div className="relative">
              <img src={require('./../../img/signering_kodebrikke2@2x.png')} alt="" />
              <div className="bg-none bg-transparent border-0 absolute text-white top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 w-24 text-center text-2xl focus:outline-none">
                {keyCode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenThird;
