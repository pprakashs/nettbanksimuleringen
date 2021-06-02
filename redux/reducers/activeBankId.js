import { SET_SCREEN, SET_ERROR, SET_PASSWORD, SET_PIN_CODE } from './../types';
import { activeBankIDInitialState } from './../state';

const activeBankIdReducer = (state = activeBankIDInitialState, action) => {
	switch (action.type) {
		case SET_SCREEN:
			return {
				...state,
				screen: action.payload,
			};
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case SET_PASSWORD:
			return {
				...state,
				password: action.payload,
			};
		case SET_PIN_CODE:
			return {
				...state,
				pinCode: action.payload,
			};
		default:
			return state;
	}
};
export default activeBankIdReducer;
