import { Dispatches } from '@constant';

export default {
	login: () => {
		return {
			type: Dispatches.LOGIN,
			payload: '123',
		};
	},
	logout: () => {
		return {
			type: Dispatches.LOGOUT,
		};
	},
};
