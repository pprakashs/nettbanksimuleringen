import { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { numberFormat } from './../util/numberFormat';
import Layout from '../components/Layout';
import { setAccount } from './../redux/actions/accountsAction';
import { setScreen } from '../redux/actions/activeBankIdAction';

const Account = ({ accounts }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setScreen(1));
  }, []);
  const clickHandle = (e) => {
    dispatch(setAccount(e));
  };
  return (
    <Layout>
      <section className="bg-white lg:px-12 px-6 shadow-md">
        <div className="pt-10 lg:pb-[200px] pb-16">
          <h1 className="mb-6">Startsiden</h1>
          <table className="table-fixed border-r border-b border-secondary w-full text-base lg:text-xl">
            <thead>
              <tr className="border-t border-secondary text-left bg-[#E0E0E0]">
                <th className="w-2/5 py-2 lg:px-5 px-3 border-l border-secondary font-anenirHeavy">Navn</th>
                <th className="w-1/5 py-2 lg:px-5 px-3 border-l border-secondary text-left font-anenirHeavy">Kontonummer</th>
                <th className="w-1/5 py-2 lg:px-5 px-3 border-l border-secondary text-right font-anenirHeavy">Bokført saldo</th>
                <th className="w-3/12 py-2 lg:px-5 px-3 border-l border-secondary text-right font-anenirHeavy">Disponibelt beløp</th>
                <th className="w-10 "> </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr className="border-t border-secondary" key={index}>
                  <td className="py-2 lg:px-5 px-3 border-l border-secondary">
                    <Link href="/oversikt">
                      <a className="underline hover:no-underline" onClick={() => clickHandle(account.accountName)}>
                        {account.accountName}
                      </a>
                    </Link>
                  </td>
                  <td className="py-2 lg:px-5 px-3 border-l border-secondary text-left">{account.accountNumber}</td>
                  <td className="py-2 lg:px-5 px-3 border-l border-secondary text-right">{numberFormat(account.actualAmount)}</td>
                  <td className="py-2 lg:px-5 px-3 border-l border-secondary text-right">{numberFormat(account.remainingAmount)}</td>
                  <th className="w-10 border-l border-secondary bg-pink text-center">
                    <div className="w-full flex justify-center items-center">
                      <button
                        type="button"
                        className="bg-none border-0 outline-non text-gray-600 focus:outline-none cursor-pointer tooltip"
                        data-tooltip-text="Denne funksjonen er dessverre ikke aktiv i nettbanksimuleringen."
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.accounts.allAccounts,
});

export default connect(mapStateToProps)(Account);
