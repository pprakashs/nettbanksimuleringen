import { useDispatch, useSelector } from 'react-redux';
import HeaderSecondary from '../components/HeaderSecondary';
import ScreenFirst from '../components/activeBankID/ScreenFirst';
import ScreenSecond from '../components/activeBankID/ScreenSecond';
import ScreenThird from '../components/activeBankID/ScreenThird';
import ScreenFourth from '../components/activeBankID/ScreenFourth';
import ScreenFifth from '../components/activeBankID/ScreenFifth';
import ScreenSixth from '../components/activeBankID/ScreenSixth';
import ScreenSeventh from '../components/activeBankID/ScreenSeventh';
import ScreenEight from '../components/activeBankID/ScreenEight';
import ScreenNine from '../components/activeBankID/ScreenNine';

const ActiveBankID = () => {
	const { screen } = useSelector((state) => state.activeBankId);

	return (
		<>
			<HeaderSecondary />

			<section className="py-20 min-h-screen flex flex-col justify-center">
				{screen === 1 && <ScreenFirst />}
				{screen === 2 && <ScreenSecond />}
				{screen === 3 && <ScreenThird />}
				{screen === 4 && <ScreenFourth />}
				{screen === 5 && <ScreenFifth />}
				{screen === 6 && <ScreenSixth />}
				{screen === 7 && <ScreenSeventh />}
				{screen === 8 && <ScreenEight />}
				{screen === 9 && <ScreenNine />}
			</section>
		</>
	);
};

export default ActiveBankID;
