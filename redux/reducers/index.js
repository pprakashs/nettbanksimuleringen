import { combineReducers } from 'redux';
import accountsReducer from './accounts';

const allReducer = combineReducers({
	accounts: accountsReducer,
});

export default allReducer;
