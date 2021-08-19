import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { deleteAutoPayment, setAutoPayment } from './../redux/actions/autoPaymentAction';
import { taskAutoPaymentPanel } from './../redux/actions/taskAction';

import panelAnimation from './../util/panelAnimation';

const AutomaticPayment = ({ autoPayments, autoPaymentSuggestion, task }) => {
  const [popup, setPopup] = useState(false);
  const [accountNumber, setAccountNumber] = useState(false);

  const [sideBar, setSidebar] = useState(true);
  const containerRef = useRef();
  const sidePanel = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!task.completed) panelAnimation(containerRef, sidePanel);
  }, []);

  const submitHandle = (accNumber) => {
    setPopup(!popup);
    setAccountNumber(accNumber);
  };
  const deleteHandel = () => {
    dispatch(deleteAutoPayment(accountNumber));
    setPopup(!popup);
  };
  const setAutoPaymentHandle = (accName) => {
    dispatch(setAutoPayment(...autoPaymentSuggestion.filter((list) => list.name === accName)));
  };

  const sidebarCloseHandle = () => {
    dispatch(taskAutoPaymentPanel(!task.panel));
    setSidebar(false);
    if (!task.completed) {
      containerRef.current.style.width = '100%';
      sidePanel.current.classList.add('hidden');
    }
  };
  const sidebarPanelOpenHandle = () => {
    dispatch(taskAutoPaymentPanel(!task.panel));
    setSidebar(true);
    if (!task.completed) panelAnimation(containerRef, sidePanel);
  };
  return (
    <Layout>
      <div className="flex space-x-6">
        <section className="bg-white px-7 shadow-md w-full transition-all duration-500" ref={containerRef}>
          <div className="py-10">
            <h1 className="mb-6">Avtalegiro</h1>
            <div className="flex mb-2">
              <h2 className="text-2xl font-avenir">Aktive avtalegiro</h2>
              {!sideBar && (
                <button onClick={sidebarPanelOpenHandle} className="bg-none text-black underline ml-auto text-xl focus:outline-none">
                  Vis oppgavetekst
                </button>
              )}
            </div>

            <table className={`table-fixed border-r border-b border-secondary w-full ${sideBar ? 'text-base' : 'lg:text-xl text-base'}`}>
              <thead>
                <tr className="border-b border-t border-secondary text-left bg-[#E0E0E0]">
                  <th className="w-3/12 py-2 lg:px-5 px-3 border-l border-secondary font-anenirHeavy">Betalingsmottaker</th>
                  <th className="w-2/5 py-2 lg:px-5 px-3 border-l border-secondary text-left font-anenirHeavy">Fra konto</th>
                  <th className="w-2/6 py-2 lg:px-5 px-3 border-l border-secondary text-left font-anenirHeavy">Kontonummer</th>
                  <th className="w-2/12 py-2 lg:px-5 px-3 border-l border-secondary text-left font-anenirHeavy">Status</th>
                </tr>
              </thead>
              <tbody>
                {autoPayments.map((list, index) => (
                  <tr className={`${index % 2 !== 0 && 'bg-[#EFEFEF]'}`} key={index}>
                    <td className="w-3/12 py-2 lg:px-5 px-3 border-l border-secondary text-left">{list.name}</td>
                    <td className="w-2/5 py-2 lg:px-5 px-3 border-l border-secondary text-left">
                      <strong className="font-anenirHeavy">{list.paymentFrom.accountNumber}</strong> {list.paymentFrom.accountName}
                    </td>
                    <td className="py-2 lg:px-5 px-3 border-l border-secondary text-left">{list.accountNumber}</td>
                    <td className="py-2 lg:px-5 px-3 border-l border-secondary text-left">Aktiv</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {autoPaymentSuggestion.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-avenir mb-4">Forslag til nye AvtaleGiro</h2>

                <table className="table-fixed border-r border-b border-secondary w-full lg:text-xl text-base">
                  <thead>
                    <tr className="border-b border-t border-secondary text-left bg-[#E0E0E0]">
                      <th className="w-4/5 py-2 lg:px-5 px-3 border-l border-secondary font-anenirHeavy">Mottaker</th>
                      <th className="w-1/5 py-2 lg:px-5 px-3 border-0 font-anenirHeavy">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autoPaymentSuggestion.map((list, index) => (
                      <tr className={`${index % 2 !== 0 && 'bg-[#EFEFEF]'}`} key={index}>
                        <td className="w-4/5 py-2 lg:px-5 px-3 border-l border-secondary text-left">{list.name}</td>
                        <td className="w-1/5 py-2 lg:px-5 px-3 text-left border-0">
                          <Link href="/opprett-avtalegiro">
                            <a
                              onClick={() => setAutoPaymentHandle(list.name)}
                              className="bg-none focus:outline-none text-primary ml-auto underline hover:no-underline"
                            >
                              Aktiver
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div
            className={`fixed z-10 inset-0 overflow-y-auto ${!popup ? 'hidden' : 'block'}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className={`fixed inset-0 bg-gray-500 transition-opacity ${!popup ? 'opacity-0' : 'bg-opacity-75'}`} aria-hidden="true"></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>

              <div
                className={`inline-block align-bottom bg-white px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full pb-12 transition duration-300 delay-100 ${
                  !popup ? 'opacity-0 scale-90' : 'opacity-1 scale-100'
                }`}
              >
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-2xl font-medium text-black mb-3">Avslutt avtalegiro</h3>
                    <p className="text-base mb-7">Vil du avslutte avtalegiro for Se på TV?</p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex space-x-3 justify-center">
                  <button
                    type="button"
                    className="rounded-md bg-primary px-6 py-2 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition"
                    onClick={deleteHandel}
                  >
                    Slett avtale
                  </button>
                  <button
                    className="bg-white p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-pink"
                    onClick={() => setPopup(!popup)}
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {!task.completed && (
          <>
            {task.panel && (
              <div className="w-3/12 p-5 border border-gray-1100 bg-blue-50  relative  hidden opacity-0 transition duration-300" ref={sidePanel}>
                <h1 className="mb-5 text-lg">Oppgavetekst</h1>
                <p className="text-base">
                  AvtaleGiro er automatisk betaling av faste regninger. Du ønsker å opprette AvtaleGiro for de faste utgiftene dine slik at du slipper
                  å huske på forfallsdatoer. Under “forslag til nye AvtaleGiro” finner du forslag basert på regninger du har betalt tidligere. Opprett
                  en AvtaleGiro for et av forslagene.
                </p>

                <button type="button" onClick={sidebarCloseHandle} className="text-black w-6 h-6 absolute top-3 right-3 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  autoPayments: state.autoPayments.autoPayments,
  autoPaymentSuggestion: state.autoPayments.autoPaymentSuggestion,
  task: state.task.taskAutoPayment,
});
export default connect(mapStateToProps)(AutomaticPayment);
