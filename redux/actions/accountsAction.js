import { SET_ACCOUNT, CREATE_PAYMENT, TRANSFER_PAYMENT } from './../types';

export const setAccount = (name) => {
	return { type: SET_ACCOUNT, payload: name };
};
export const createPayment = (data) => {
	return { type: CREATE_PAYMENT, payload: data };
};

export const transferPayment = (data) => {
	return { type: TRANSFER_PAYMENT, payload: data };
};
