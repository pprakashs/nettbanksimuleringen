import { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { dropdown } from '../util/dropdown';
import { numberFormat } from './../util/numberFormat';
import { setTransaction } from './../redux/actions/transactionAction';
import { taskTransferPanel } from './../redux/actions/taskAction';
import panelAnimation from './../util/panelAnimation';

const Transfer = ({ accounts, task, transaction }) => {
  const [transferFormAccount, setTransferFormAccount] = useState({});
  const [transferToAccount, setTransferToAccount] = useState({});
  const [sideBar, setSidebar] = useState(true);
  const containerRef = useRef();
  const sidePanel = useRef();
  const [error, setError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectAccountHandle = (e) => {
    dropdown(e.currentTarget.parentNode.parentNode);
  };

  let amountStr = null;
  let details = '';

  if (transaction !== null && transaction.paymentType === 'transfer') {
    details = transaction.details;
    amountStr = transaction.amount.toString().split('.');
  }

  useEffect(() => {
    if (!task.completed) panelAnimation(containerRef, sidePanel);
    if (transaction !== null && transaction.paymentType === 'transfer') {
      setTransferFormAccount(...accounts.filter((acc) => acc.accountName === transaction.transferForm.accountName));
      setTransferToAccount(accounts.filter((acc) => acc.accountName !== transaction.transferTo.accountName)[0]);
      return;
    }
    setTransferFormAccount(...accounts.filter((acc) => acc.accountName === 'Brukskonto'));
    setTransferToAccount(accounts.filter((acc) => acc.accountName !== 'Brukskonto')[0]);
  }, []);

  const transferFormHandle = (accountName) => {
    setTransferFormAccount(...accounts.filter((acc) => acc.accountName === accountName));
    setTransferToAccount(accounts.filter((acc) => acc.accountName !== accountName)[0]);
  };

  const transferTomHandle = (accountName) => {
    setTransferToAccount(...accounts.filter((acc) => acc.accountName === accountName));
  };

  const sidebarCloseHandle = () => {
    dispatch(taskTransferPanel(!task.panel));
    setSidebar(false);
    if (!task.completed) {
      containerRef.current.style.width = '100%';
      sidePanel.current.classList.add('hidden');
    }
  };
  const sidebarPanelOpenHandle = () => {
    dispatch(taskTransferPanel(!task.panel));
    setSidebar(true);
    if (!task.completed) panelAnimation(containerRef, sidePanel);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const target = e.target.elements;
    const amount = `${target.amount.value}.${target.amountCent.value}`;
    const amountInt = amount * 1;

    if (!task.completed && transferFormAccount.accountName !== 'Brukskonto' && transferToAccount.accountName !== 'Sparekonto') {
      setError('Du må overføre fra "Brukskonto" til "Sparekonto".');
      return;
    }

    if (!task.completed && task.payment.amount !== amountInt) {
      setError('Beløpet stemmer ikke med regningen.');
      return;
    }
    if (!task.completed && amountInt > task.payment.amount) {
      setError('Du kan ikke overføre mer enn det du har tilgjengelig på konto.');
      return;
    }
    if (amountInt > transferFormAccount.remainingAmount) {
      setError('Du kan ikke overføre mer enn det du har tilgjengelig på konto.');
      return;
    }
    if (amount === '.') {
      setError('Beløp må fylles ut.');
      return;
    }
    if (amountInt < 0 || amountInt === 0) {
      setError('Beløpet må være "positivt".');
      return;
    }
    details = target.details.value;
    if (!task.completed && details === '') {
      details = task.payment.details;
    }
    const data = {
      amount: amount * 1,
      details: details,
      paymentType: 'transfer',
      transferForm: {
        accountName: transferFormAccount.accountName,
        accountNumber: transferFormAccount.accountNumber,
        type: 'debit',
      },
      transferTo: {
        accountName: transferToAccount.accountName,
        accountNumber: transferToAccount.accountNumber,
        type: 'credit',
      },
    };

    dispatch(setTransaction(data));
    router.push('/bekreft-overforing');
  };

  return (
    <Layout>
      <div className="flex space-x-6">
        <section className="bg-white px-7 shadow-md w-full transition-all duration-500" ref={containerRef}>
          <div className="py-10">
            <div className="flex">
              <h1 className="mb-8">Overføring mellom egne kontoer</h1>
              {!sideBar && (
                <button onClick={sidebarPanelOpenHandle} className="bg-none text-black underline ml-auto text-xl focus:outline-none">
                  Vis oppgavetekst
                </button>
              )}
            </div>
            <form className="pb-10 text-base lg:text-xl" onSubmit={submitHandle}>
              <div className={`flex ${task.panel ? 'flex-row space-x-6' : 'flex-col'}`}>
                <div className="w-full">
                  <div className="border border-black-100">
                    <div className="bg-[#E0E0E0] flex">
                      <div className="w-2/3 lg:text-xl text-base font-anenirHeavy lg:px-5 px-3 py-2">Overføre fra konto</div>
                    </div>

                    <div className="flex border-t border-black-100">
                      <div className={`py-5 lg:px-5 px-3 ${task.panel ? 'w-full' : 'w-3/4'}`}>
                        <div className="relative">
                          <div className="relative">
                            <button
                              type="button"
                              className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-14 border border-[#B3B3B4] w-full text-left flex has-dropdown"
                              onClick={selectAccountHandle}
                            >
                              <div className="pointer-events-none">
                                <strong className="font-anenirHeavy">{transferFormAccount.accountNumber}</strong> {transferFormAccount.accountName}
                              </div>
                              <div className="ml-auto pointer-events-none">
                                Disponibel saldo: <strong className="font-anenirHeavy">{numberFormat(transferFormAccount.remainingAmount)}</strong>
                              </div>
                            </button>
                            <i className="absolute top-[22px] right-4 w-6 h-4 pointer-events-none">
                              <img src={require('./../img/down-arrow.svg')} className="w-6" alt="" />
                            </i>
                          </div>

                          <ul className="dropdown border border-[#B3B3B4] rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-40 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
                            {accounts
                              .filter((acc) => acc.accountName !== transferFormAccount.accountName)
                              .map((account, index) => (
                                <li key={index}>
                                  <button
                                    onClick={() => transferFormHandle(account.accountName)}
                                    type="button"
                                    className=" px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14"
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
                    </div>
                  </div>

                  <div className="border border-t-0 border-black-100">
                    <div className="bg-[#E0E0E0] flex">
                      <div className="w-2/3 font-anenirHeavy lg:px-5 px-3 py-2">Overføre til konto</div>
                    </div>

                    <div className="flex border-t border-black-100">
                      <div className={`py-5 lg:px-5 px-3 ${task.panel ? 'w-full' : 'w-3/4'}`}>
                        <div className="relative">
                          <div className="relative">
                            <button
                              type="button"
                              className="selected-account focus:outline-none cursor-pointer px-3 py-[10px] pr-14 border border-[#B3B3B4] w-full text-left flex has-dropdown"
                              onClick={selectAccountHandle}
                            >
                              <div className="pointer-events-none">
                                <strong className="font-anenirHeavy">{transferToAccount.accountNumber}</strong> {transferToAccount.accountName}
                              </div>
                              <div className="ml-auto pointer-events-none">
                                Disponibelt beløp: <strong className="font-anenirHeavy">{numberFormat(transferToAccount.remainingAmount)}</strong>
                              </div>
                            </button>
                            <i className="absolute top-[22px] right-4 w-6 h-4 pointer-events-none">
                              <img src={require('./../img/down-arrow.svg')} className="w-6" alt="" />
                            </i>
                          </div>

                          <ul className="dropdown border border-[#B3B3B4] rounded-b border-t-0 absolute top-full left-0 w-full bg-white z-40 -mt-1 overflow-hidden transition opacity-0 duration-300 hidden">
                            {accounts
                              .filter((acc) => acc.accountName !== transferFormAccount.accountName)
                              .map((account, index) => {
                                if (account.accountName !== transferToAccount.accountName) {
                                  return (
                                    <li key={index}>
                                      <button
                                        type="button"
                                        onClick={() => transferTomHandle(account.accountName)}
                                        className=" px-3 py-3 hover:bg-pink transition focus:outline-none flex w-full pr-14"
                                      >
                                        <div>
                                          <strong className="font-anenirHeavy">{account.accountNumber}</strong> {account.accountName}
                                        </div>
                                        <div className="ml-auto">
                                          Disponibelt beløp: <strong className="font-anenirHeavy">{numberFormat(account.remainingAmount)}</strong>
                                        </div>
                                      </button>
                                    </li>
                                  );
                                }
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-black-100 mt-6">
                    <div className="bg-[#E0E0E0] flex">
                      <div className="w-9/12 font-anenirHeavy lg:px-5 px-3 py-2">Egen kommentar</div>
                      <div className="w-3/12 border-l border-black-100 lg:px-5 px-3 py-2">
                        <strong className="font-anenirHeavy">Beløp</strong> (kr og øre)
                      </div>
                    </div>

                    <div className="flex border-t border-black-100">
                      <div className="w-9/12 py-5 lg:px-5 px-3">
                        <input
                          type="text"
                          name="details"
                          defaultValue={details}
                          className="border border-[#B3B3B4] w-full p-3 h-[48px] focus:outline-none"
                        />
                        <input type="text" name="detailsDefault" defaultValue={!task.completed ? task.payment.details : ''} hidden />
                      </div>
                      <div className="w-3/12 border-l border-black-100 py-5 lg:px-5 px-3">
                        <div className="flex space-x-4">
                          <input
                            type="number"
                            name="amount"
                            defaultValue={amountStr !== null && amountStr[0]}
                            className="number-field border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-8/12"
                          />
                          <input
                            type="number"
                            name="amountCent"
                            defaultValue={amountStr !== null && amountStr[1]}
                            className="number-field border border-[#B3B3B4] p-3 h-[48px] focus:outline-none w-4/12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-8 items-center mt-7">
                <button
                  type="submit"
                  className="rounded-md bg-primary px-6 py-2 text-white font-anenirHeavy text-xl  uppercase focus:outline-none hover:bg-pink transition hover:text-black"
                >
                  bekreft overføring
                </button>
                {error && <div className="text-lg text-red-1100">{error}</div>}
              </div>
            </form>
          </div>
        </section>

        {!task.completed && (
          <>
            {task.panel && (
              <div className="w-3/12 p-5 border border-gray-1100 bg-blue-50 relative  hidden opacity-0 transition duration-300" ref={sidePanel}>
                <h1 className="mb-5 text-lg">Oppgavetekst</h1>
                <p className="text-base">Du ønsker å overføre 1000 kr fra brukskonto til sparekonto.</p>

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
  accounts: state.accounts.allAccounts,
  task: state.task.taskTransfer,
  transaction: state.transaction,
});

export default connect(mapStateToProps)(Transfer);
