import { SET_USER } from './../types';
import { userInitialState } from './../state';

const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				loggedIn: true,
				verifiedType: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
