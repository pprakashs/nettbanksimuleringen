import { SET_ACCOUNT } from './../types';

export const set_account = (name) => {
	return { type: SET_ACCOUNT, payload: name };
};
