import { DELETE_AUTO_PAYMENT, SET_AUTO_PAYMENT, CREATE_AUTO_PAYMENT } from './../types';
import { autoPaymentInitialState } from './../state';

const autoPaymentReducer = (state = autoPaymentInitialState, action) => {
	switch (action.type) {
		case DELETE_AUTO_PAYMENT:
			return {
				...state,
				autoPayments: state.autoPayments.filter((list) => list.accountNumber !== action.payload),
			};
		case SET_AUTO_PAYMENT:
			return {
				...state,
				selectedAutoPaymentSuggestion: action.payload,
			};
		case CREATE_AUTO_PAYMENT:
			return {
				...state,
				autoPayments: [action.payload, ...state.autoPayments],
				autoPaymentSuggestion: state.autoPaymentSuggestion.filter((list) => list.accountNumber !== action.payload.accountNumber),
			};
		default:
			return state;
	}
};

export default autoPaymentReducer;
