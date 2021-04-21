import { TRANSFER_CREATED, PAYMENT_CREATED, TRANSFER_PANEL, PAYMENT_PANEL } from './../types';
import { taskInitialState } from './../state';

const taskReducer = (state = taskInitialState, action) => {
	switch (action.type) {
		case TRANSFER_CREATED:
			return {
				...state,
				taskTransfer: {
					completed: true,
					panel: false,
					payment: [],
				},
			};
		case PAYMENT_CREATED:
			return {
				...state,
				taskPayment: {
					completed: true,
					panel: false,
					payment: [],
				},
			};
		case TRANSFER_PANEL:
			return {
				...state,
				taskTransfer: {
					panel: action.payload,
					completed: state.taskTransfer.completed,
					payment: state.taskTransfer.payment,
				},
			};
		case PAYMENT_PANEL:
			return {
				...state,
				taskPayment: {
					panel: action.payload,
					completed: state.taskPayment.completed,
					payment: state.taskPayment.payment,
				},
			};
		default:
			return state;
	}
};

export default taskReducer;
