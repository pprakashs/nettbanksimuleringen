import { DELETE_AUTO_PAYMENT, SET_AUTO_PAYMENT, CREATE_AUTO_PAYMENT } from './../types';

export const deleteAutoPayment = (accountNumber) => {
	return {
		type: DELETE_AUTO_PAYMENT,
		payload: accountNumber,
	};
};

export const createAutoPayment = (data) => {
	return {
		type: CREATE_AUTO_PAYMENT,
		payload: data,
	};
};

export const setAutoPayment = (accountNumber) => {
	return {
		type: SET_AUTO_PAYMENT,
		payload: accountNumber,
	};
};
