import { SET_TRANSACTION } from './../types';
import { transactionInitialState } from './../state';

const transactionReducer = (state = transactionInitialState, action) => {
	switch (action.type) {
		case SET_TRANSACTION:
			return action.payload;

		default:
			return state;
	}
};

export default transactionReducer;
