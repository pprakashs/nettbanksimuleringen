import { SET_ACCOUNT, CREATE_PAYMENT, TRANSFER_PAYMENT } from '../types';
import { accountInitialState } from './../state/';
import { getDate } from '../../util/dates';

const accountReducer = (state = accountInitialState, action) => {
	switch (action.type) {
		case SET_ACCOUNT:
			return {
				...state,
				selectedAccount: action.payload,
			};
		case CREATE_PAYMENT:
			return {
				...state,
				allAccounts: state.allAccounts.map((el) => {
					if (el.accountName === action.payload.selectedAccountName) {
						el.remainingAmount = el.remainingAmount - action.payload.amount;
						el.transaction.unshift({
							details: action.payload.details,
							amount: action.payload.amount,
							accountNumber: action.payload.accountNumber,
							date: getDate(0),
							type: action.payload.type,
						});
					}
					return el;
				}),
			};
		case TRANSFER_PAYMENT:
			return {
				...state,
				allAccounts: state.allAccounts.map((el) => {
					if (el.accountName === action.payload.transferForm.accountName) {
						el.remainingAmount = el.remainingAmount - action.payload.amount;
						el.transaction.unshift({
							details: action.payload.details,
							amount: action.payload.amount,
							date: getDate(0),
							type: 'debit',
						});
					}
					if (el.accountName === action.payload.transferTo.accountName) {
						el.remainingAmount = el.remainingAmount + action.payload.amount;
						el.transaction.unshift({
							details: action.payload.details,
							amount: action.payload.amount,
							date: getDate(0),
							type: 'credit',
						});
					}
					return el;
				}),
			};
		default:
			return state;
	}
};

export default accountReducer;
