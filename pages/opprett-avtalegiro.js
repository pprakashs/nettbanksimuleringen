import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { dropdown } from '../util/dropdown';
import { numberFormat } from './../util/numberFormat';
import { createAutoPayment, setAutoPayment } from './../redux/actions/autoPaymentAction';
import { taskAutoPaymentCreated } from './../redux/actions/taskAction';

const CreateAutoPayment = ({ accounts, autoPayments, task }) => {
  const [selectedAccount, setSelectedAccount] = useState({});
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (autoPayments.selectedAutoPaymentSuggestion === null) {
      router.push('/avtalegiro');
      return;
    }
    setSelectedAccount(...accounts.filter((acc) => acc.accountName === 'Brukskonto'));
  }, []);
  const selectAccountHandle = (e) => {
    dropdown(e.currentTarget.parentNode.parentNode);
  };

  const changeAccountHandle = (accountName) => {
    setSelectedAccount(...accounts.filter((acc) => acc.accountName === accountName));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const target = e.target.elements;
    const amount = `${target.amount.value}.${target.amountCent.value}`;

    const amountInt = amount * 1;
    if (amount === '.') {
      setError('Beløp må fylles ut');
      return;
    }
    if (amountInt > selectedAccount.remainingAmount) {
      setError('Beløpet kan ikke være høyere enn det du har tilgjengelig på konto');
      return;
    }

    const data = {
      amount: amountInt,
      name: autoPayments.selectedAutoPaymentSuggestion.name,
      accountNumber: autoPayments.selectedAutoPaymentSuggestion.accountNumber,
      paymentFrom: {
        accountNumber: selectedAccount.accountNumber,
        accountName: selectedAccount.accountName,
      },
    };
    dispatch(setAutoPayment(null));
    dispatch(createAutoPayment(data));
    if (!task.completed) dispatch(taskAutoPaymentCreated());
    router.push('/avtalegiro');
  };

  return (
    <Layout>
      <section className="bg-white px-7 shadow-md">
        <div className="py-10">
          <h1 className="mb-8">Opprette avtalegiro</h1>
          <form className="pb-10 lg:text-xl text-base" onSubmit={submitHandle}>
            <div className="border border-black-100">
              <div className="bg-[#E0E0E0] flex">
                <div className="w-2/3 font-anenirHeavy lg:px-5 px-3 py-2">Fra konto</div>
                <div className="w-1/3 border-l border-black-100 font-anenirHeavy lg:px-5 px-3 py-2">Til</div>
              </div>

              <div className="flex border-t border-black-100">
                <div className="w-2/3 py-5 lg:px-5 px-3">
                  <div className="relative">
                    <div className="relative">
                      <button
                        type="button"
                        className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-14 border border-[#B3B3B4] w-full text-left flex has-dropdown"
                        onClick={selectAccountHandle}
                      >
                        <div className="pointer-events-none">
                          <strong className="font-anenirHeavy">{selectedAccount.accountNumber}</strong> {selectedAccount.accountName}
                        </div>
                        <div className="ml-auto pointer-events-none">
                          Disponibelt beløp: <strong className="font-anenirHeavy">{numberFormat(selectedAccount.remainingAmount)}</strong>
                        </div>
                      </button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="5"
                        viewBox="0 0 16.387 6.193"
                        className="absolute top-[17px] right-4 w-6 h-4 pointer-events-none"
                      >
                        <g id="Down_arrow" data-name="Down arrow" transform="translate(0.693 0.693)">
                          <path
                            id="Path_10"
                            data-name="Path 10"
                            d="M15.5,5.5,8,10.5.5,5.5"
                            transform="translate(-0.5 -5.5)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                          />
                        </g>
                      </svg>
                    </div>

                    <ul className="dropdown border border-[#B3B3B4] rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-40 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
                      {accounts
                        .filter((acc) => acc.accountName !== selectedAccount.accountName)
                        .map((account, index) => (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() => changeAccountHandle(account.accountName)}
                              className="px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14"
                            >
                              <div>
                                <strong className="font-anenirHeavy">{account.accountNumber}</strong> {account.accountName}
                              </div>
                              <div className="ml-auto">
                                Disponibelt beløp: <strong className="font-anenirHeavy">{numberFormat(account.remainingAmount)}</strong>
                              </div>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="w-1/3 border-l border-black-100 py-5 lg:px-5 px-3">
                  {autoPayments.selectedAutoPaymentSuggestion !== null && (
                    <div className="flex text-base items-left flex-col">
                      <span>{autoPayments.selectedAutoPaymentSuggestion.name}</span>
                      Kontonummer: {autoPayments.selectedAutoPaymentSuggestion.accountNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border border-black-100 border-t-0">
              <div className="bg-[#E0E0E0] flex relative">
                <div className="w-2/5 lg:px-5 px-3 py-2 flex items-center">
                  <button
                    className="border-2 bg-white mr-3 border-primary rounded-full w-8 h-8 justify-center items-center flex font-bold text-blue focus:outline-none cursor-pointer tooltip"
                    data-tooltip-text="Begrens hva mottaker kan belaste per måned."
                    data-tooltip-bg="bg-pink"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none" width="10.08" height="17.568" viewBox="0 0 10.08 17.568">
                      <path
                        id="Path_35"
                        data-name="Path 35"
                        d="M18.54,19.248V17.784a5.091,5.091,0,0,1,.1-1.08,2.914,2.914,0,0,1,.288-.78,3.019,3.019,0,0,1,.516-.672q.324-.324.8-.78.384-.36.768-.732a7.739,7.739,0,0,0,.7-.768,4.162,4.162,0,0,0,.516-.84,2.358,2.358,0,0,0,.2-1,2.525,2.525,0,0,0-.2-1.02,2.582,2.582,0,0,0-.54-.8,2.423,2.423,0,0,0-.8-.528,2.6,2.6,0,0,0-1-.192,2.558,2.558,0,0,0-1.908.744A3.228,3.228,0,0,0,17.1,11.28l-2.448-.24a5.057,5.057,0,0,1,1.74-3.276,5.349,5.349,0,0,1,3.54-1.188,5.777,5.777,0,0,1,1.884.3,4.527,4.527,0,0,1,1.524.864,3.979,3.979,0,0,1,1.02,1.392,4.551,4.551,0,0,1,.372,1.884,4.419,4.419,0,0,1-.264,1.6,4.836,4.836,0,0,1-.744,1.284l-1.44,1.488-.24.216q-.384.36-.612.612a2.21,2.21,0,0,0-.36.528,2.1,2.1,0,0,0-.18.612,6.1,6.1,0,0,0-.048.84v1.056Zm-.456,3.312a1.6,1.6,0,1,1,.468,1.116A1.524,1.524,0,0,1,18.084,22.56Z"
                        transform="translate(-14.652 -6.576)"
                        fill="#0025A0"
                      />
                    </svg>
                  </button>
                  <strong className="font-anenirHeavy">Beløpsgrense per måned (kr og øre)</strong>
                </div>
                <div className="w-3/5 border-l border-black-100 font-anenirHeavy px-5 py-2">
                  <strong className="font-anenirHeavy">Egen kommentar</strong>
                </div>
              </div>

              <div className="flex border-t border-black-100">
                <div className="w-2/5 py-5 lg:px-5 px-3">
                  <div className="flex space-x-4 max-w-xs">
                    <input type="number" name="amount" className="number-field border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-8/12" />
                    <input type="number" name="amountCent" className="number-field border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-4/12" />
                  </div>
                </div>
                <div className="w-3/5 py-5 lg:px-5 px-3 border-l border-black-100">
                  <input type="text" name="accountNumber" className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-7 items-center">
              <button
                type="submit"
                className="rounded-md bg-primary px-6 py-3 text-white font-anenirHeavy uppercase focus:outline-none hover:bg-pink hover:text-black transition"
              >
                Opprett avtale
              </button>
              <Link href="/avtalegiro">
                <a className="bg-white p-3 rounded-lg border border-black uppercase font-anenirHeavy text-black transition w-32 text-center hover:bg-pink">
                  Avbryt
                </a>
              </Link>

              {error && <div className="text-lg text-red-1100">{error}</div>}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.accounts.allAccounts,
  autoPayments: state.autoPayments,
  task: state.task.taskAutoPayment,
});

export default connect(mapStateToProps)(CreateAutoPayment);
