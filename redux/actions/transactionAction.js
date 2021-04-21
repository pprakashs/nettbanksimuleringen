import { SET_TRANSACTION } from './../types';

export const setTransaction = (data) => {
	return {
		type: SET_TRANSACTION,
		payload: data,
	};
};
