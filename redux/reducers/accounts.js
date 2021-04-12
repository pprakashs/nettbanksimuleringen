import { SET_ACCOUNT } from '../types';
import { initialState } from './../state/';

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACCOUNT:
			return {
				...state,
				selectedAccount: action.payload,
			};
		default:
			return state;
	}
};

export default accountReducer;
