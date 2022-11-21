/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { AuthInterface } from '@interfaces';

const initialState: AuthInterface.AuthState = {

	loading: false,
	user: null
};

type Actions = { type: string; payload: any; };

const authReducers = (
	state = initialState,
	action: Actions,
): AuthInterface.AuthState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.LOGIN:
			return {
				...state,
				user: payload
			};
		case Dispatches.LOADING_AUTH:
			return {
				...state,
				loading: payload
			};
		case Dispatches.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default authReducers;
