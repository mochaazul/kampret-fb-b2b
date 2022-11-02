/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactInterface } from '@interfaces';
import { Dispatches } from '@constant';

const initialState: ContactInterface.ContactState = {
	contact: [],
	loading: false,
};

type Actions = { type: string; payload: any };

const contactReducers = (
	state = initialState,
	action: Actions,
): ContactInterface.ContactState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.LOADING_CONTACT:
			return {
				...state,
				loading: payload,
			};
		case Dispatches.SET_CONTACT:
			return {
				...state,
				contact: payload,
			};
		case Dispatches.CLEAR_CONTACT:
			return {
				...state,
				contact: [],
			};
		case Dispatches.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default contactReducers;
