import { useDispatch, useSelector } from 'react-redux';
import { setScreen } from './../../redux/actions/activeBankIdAction';
const ScreenSecond = () => {
  const dispatch = useDispatch();
  const { screen } = useSelector((state) => state.activeBankId);
  return (
    <div className="container max-w-[791px] flex my-6 space-x-6 transition duration-500 transition-max-width">
      <div className="lg:w-[800px] bg-white px-10 py-10 shadow-md">
        <h1 className="mb-6">Bestill BankID på mobil</h1>

        <div className="border border-gray-300 px-7 py-10 min-h-[200px] mb-5">
          <h2 className="text-2xl font-normal mb-8">Godkjenn vilkår for BankID</h2>
          <p className="text-xl pb-7">
            Ved å gå videre bekrefter jeg at:
            <br />
            • Jeg forstår at BankID bekrefter min identitet på linje med min håndskrevne signatur.
            <br />
            • Jeg forstår at passord eller kodebrikke aldri må deles med andre.
            <br />• Jeg er gjort kjent med Avtalevilkår for PersonBankID.
          </p>

          <div className="w-32 text-center">
            <button
              type="button"
              className="rounded-md bg-primary p-3 text-white font-anenirHeavy text-xl uppercase focus:outline-none hover:bg-pink hover:text-black transition w-full"
              onClick={() => dispatch(setScreen(screen + 1))}
            >
              BEKREFT
            </button>
            <span className="block text-xl my-4">eller</span>
            <button
              type="button"
              className="bg-white p-3 rounded-lg border border-black uppercase text-xl font-anenirHeavy text-black transition w-32 text-center hover:bg-pink block focus:outline-none"
              onClick={() => dispatch(setScreen(screen - 1))}
            >
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenSecond;
