import { Dispatch } from 'redux';
import Toast from 'react-native-toast-message';

import { Dispatches, Endpoints } from '@constant';
import { API, NavigationHelper } from '@helpers';
import { store } from '../../config/reduxConfig';
import { NotificationInterface, MiscInterface } from '@interfaces';

export default {
	startLoader: () => {
		return {
			type: Dispatches.API_LOADING_START,
		};
	},
	endLoader: () => {
		return {
			type: Dispatches.API_LOADING_END,
		};
	},
	// action to get notification list
	getNotificationList: (link?: string) => (dispatch: Dispatch) => {
		// set loading notification
		dispatch({
			type: Dispatches.NOTIFICATION_LOADING,
			payload: true,
		});

		// request delivery list data from api
		API.get<MiscInterface.BE<NotificationInterface.Notification>>
			(`${ Endpoints.GET_NOTIFICATION(link) }`)
			.then(response => {
				console.log('notif', response);
				dispatch({
					type: Dispatches.SET_NOTIFICATION,
					payload: response.data,
				});
				dispatch({
					type: Dispatches.SET_NOTIFICATION_PAGINATION,
					payload: response.pagination,
				});
			})
			.finally(() => {
				// set loading notification
				dispatch({
					type: Dispatches.NOTIFICATION_LOADING,
					payload: false,
				});
			});
	},
	// action triggered after user click the notification
	notificationReaded: (notifId: number) => (dispatch: Dispatch) => {

		// send to api
		API.get<MiscInterface.BE<any>>
			(`${ Endpoints.READ_NOTIF(notifId) }`)
			.then(response => {
				console.log('notif read', response);
			})
			.finally(() => {

			});
	},
};
