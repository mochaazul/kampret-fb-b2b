/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { NotificationInterface } from '@interfaces';

const initialState: NotificationInterface.NotificationState = {
	loading: false,
	notification: null,
	next: null,
	prev: null,
	latestNotifReaded: 0
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
		case Dispatches.NOTIFICATION_READ:
			const modifiedNotification = state.notification;
			const notifIndex = modifiedNotification ? modifiedNotification.notifications.findIndex(notif => notif.id == payload) : -1;
			if (notifIndex != -1 && modifiedNotification) modifiedNotification.notifications[notifIndex].is_read = true;

			return {
				...state,
				notification: modifiedNotification,
				latestNotifReaded: payload
			};
		default:
			return state;
	}
};

export default notificationReducers;
