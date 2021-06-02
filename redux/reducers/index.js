import { combineReducers } from 'redux';
import accountsReducer from './accounts';
import autoPaymentsReducer from './autoPayments';
import taskReducer from './task';
import userReducer from './user';
import transactionReducer from './transaction';
import activeBankIdReducer from './activeBankId';

const allReducer = combineReducers({
	accounts: accountsReducer,
	autoPayments: autoPaymentsReducer,
	task: taskReducer,
	user: userReducer,
	transaction: transactionReducer,
	activeBankId: activeBankIdReducer,
});

export default allReducer;
