import { Dispatch } from 'redux';

import { Dispatches, Endpoints } from '@constant';
import { ContactInterface } from '@interfaces';
import { API } from '@helpers';

export default {
	getContact: () => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_CONTACT,
			payload: true,
		});
		API.get<ContactInterface.ContactReponse>(`${Endpoints.GET_CONTACT}`, {
			results: 20,
		})
			.then(response => {
				dispatch({
					type: Dispatches.CLEAR_CONTACT,
				});
				dispatch({
					type: Dispatches.SET_CONTACT,
					payload: response.results ?? [],
				});
			})
			.catch(() => {
				// todo handle error
			})
			.finally(() => {
				dispatch({
					type: Dispatches.LOADING_CONTACT,
					payload: false,
				});
			});
	},
};
