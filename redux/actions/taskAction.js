import { TRANSFER_CREATED, PAYMENT_CREATED, TRANSFER_PANEL, PAYMENT_PANEL } from './../types';

export const taskTransferCrated = (data) => {
	return {
		type: TRANSFER_CREATED,
		payload: data,
	};
};
export const taskPaymentCreated = (data) => {
	return {
		type: PAYMENT_CREATED,
	};
};
export const taskTransferPanel = (data) => {
	return {
		type: TRANSFER_PANEL,
		payload: data,
	};
};

export const taskPaymentPanel = (data) => {
	return {
		type: PAYMENT_PANEL,
		payload: data,
	};
};
