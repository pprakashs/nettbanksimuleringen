import { SET_SCREEN, SET_ERROR, SET_PASSWORD, SET_PIN_CODE } from './../types';

export const setScreen = (screen) => {
	return { type: SET_SCREEN, payload: screen };
};
export const setError = (error) => {
	return { type: SET_ERROR, payload: error };
};
export const setPassword = (pw) => {
	return { type: SET_PASSWORD, payload: pw };
};
export const setPinCode = (pinCode) => {
	return { type: SET_PIN_CODE, payload: pinCode };
};
