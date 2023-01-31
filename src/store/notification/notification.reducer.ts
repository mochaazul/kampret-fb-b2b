/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { NotificationInterface } from '@interfaces';

const initialState: NotificationInterface.NotificationState = {
	loading: false,
	notification: null,
	next: null,
	prev: null
};

type Actions = { type: string; payload: any; };

const notificationReducers = (
	state = initialState,
	action: Actions,
): NotificationInterface.NotificationState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.API_LOADING_START:
			return {
				...state,
				loading: true,
			};
		case Dispatches.SET_NOTIFICATION:
			return {
				...state,
				notification: payload,
			};
		case Dispatches.SET_NOTIFICATION_PAGINATION:
			return {
				...state,
				next: payload.next,
				prev: payload.prev
			};
		case Dispatches.API_LOADING_END:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default notificationReducers;
