import { Dispatch } from 'redux';

import { Dispatches, Endpoints } from '@constant';
import { ServerResponses, MiscInterface, AuthInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';
import { API } from '@helpers';
import { Variables } from '@constant';

export default {
	registerPushNotif: (xplayer: string) => (dispatch: Dispatch) => {
		API.post<MiscInterface.BE<any>>(`${ Endpoints.PUSH_NOTIF }`,
			{
				player_id: xplayer,
				device_type: 1,
				device_model: ''
			})
			.then(response => {
				console.log('reposn push', response);
			})
			.catch(error => {
				// todo handle error
				console.log('errrorr', error);
			})
			.finally(() => {

			});
	},
	login: (payload: AuthInterface.loginPayload) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_AUTH,
			payload: true,
		});
		dispatch({
			type: Dispatches.LOGIN,
			payload: null,
		});
		dispatch({
			type: Dispatches.LOGIN_ERROR,
			payload: null,
		});

		API.post<MiscInterface.BE<ServerResponses.LOGIN>>(`${ Endpoints.LOGIN }`, { ...payload, confirm_password: payload.password })
			.then(response => {
				if (response) {
					dispatch({
						type: Dispatches.LOGIN,
						payload: response.data,
					});
					if (response.data.user_status == Variables.USER_STATUS.ACTIVE_USER) {
						NavigationHelper.reset('Delivery');
					}
				}
			})
			.catch(error => {
				// todo handle error
				if (error.response.data && typeof error.response.data.stat_msg == 'string') {
					dispatch({
						type: Dispatches.LOGIN_ERROR,
						payload: { username: error.response.data.stat_msg },
					});
				}
			})
			.finally(() => {

				dispatch({
					type: Dispatches.LOADING_AUTH,
					payload: false,
				});
			});
	},
	requestOTP: (payload: AuthInterface.requestOTP, authType: 'login' | 'reset') => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_AUTH,
			payload: true,
		});

		if (authType == 'login') {
			API.post<MiscInterface.BE<ServerResponses.LOGIN>>(`${ Endpoints.OTP_REQUEST }`, payload)
				.then(response => {
					if (response) {
						NavigationHelper.push('OTP', { phoneNumber: payload.phone, authType });
					}
				})
				.catch(error => {
					// todo handle error
				})
				.finally(() => {

					dispatch({
						type: Dispatches.LOADING_AUTH,
						payload: false,
					});
				});
		} else {
			API.post<MiscInterface.BE<ServerResponses.LOGIN>>(`${ Endpoints.FORGOT_OTP_REQUEST }`, payload)
				.then(response => {
					if (response) {
						NavigationHelper.push('OTP', { phoneNumber: payload.phone, authType });
					}
				})
				.catch(error => {
					// todo handle error
				})
				.finally(() => {

					dispatch({
						type: Dispatches.LOADING_AUTH,
						payload: false,
					});
				});
		}

		// setTimeout(() => {
		// 	dispatch({
		// 		type: Dispatches.LOADING_AUTH,
		// 		payload: false,
		// 	});
		// 	NavigationHelper.push('OTP', { phoneNumber: payload.phone, authType });
		// }, 5000);
	},
	verifyOTP: (payload: AuthInterface.verifyOTP, authType: 'login' | 'reset') => (dispatch: Dispatch) => {

		dispatch({
			type: Dispatches.LOADING_AUTH,
			payload: true,
		});
		if (authType == 'login') {
			API.post<MiscInterface.BE<ServerResponses.OTP_REQUEST>>(`${ Endpoints.OTP_VERIFY }`, payload)
				.then(response => {
					if (response) {
						NavigationHelper.push('Delivery');
					}
				})
				.catch(error => {
					// todo handle error
				})
				.finally(() => {

					dispatch({
						type: Dispatches.LOADING_AUTH,
						payload: false,
					});
				});
		} else {
			API.post<MiscInterface.BE<ServerResponses.LOGIN>>(`${ Endpoints.FORGOT_OTP_VERIFY }`, payload)
				.then(response => {
					if (response) {
						dispatch({
							type: Dispatches.LOGIN,
							payload: response.data,
						});
						NavigationHelper.push('Reset');
					}
				})
				.catch(error => {
					// todo handle error
				})
				.finally(() => {

					dispatch({
						type: Dispatches.LOADING_AUTH,
						payload: false,
					});
				});
		}

	},
	resetPassword: (payload: AuthInterface.resetPassword) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_AUTH,
			payload: true,
		});
		API.post<MiscInterface.BE<ServerResponses.OTP_REQUEST>>(`${ Endpoints.RESET_PASSWORD }`, payload)
			.then(response => {
				if (response) {
					NavigationHelper.reset('Login');
				}
			})
			.catch(error => {
				// todo handle error
			})
			.finally(() => {

				dispatch({
					type: Dispatches.LOADING_AUTH,
					payload: false,
				});
			});
	},
	logout: () => {
		NavigationHelper.reset('Login');
		return {
			type: Dispatches.LOGOUT,
		};
	},
	resetLoginError: () => {
		return {
			type: Dispatches.LOGIN_ERROR,
			payload: null,
		};
	}
};
