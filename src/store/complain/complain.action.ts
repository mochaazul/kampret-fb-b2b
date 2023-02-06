import { Dispatch } from 'redux';
import Toast from 'react-native-toast-message';

import { Dispatches, Endpoints } from '@constant';
import { API, NavigationHelper } from '@helpers';
import { DeliveryResponseInterface, DeliveryInterface, MiscInterface, ComponentInterface } from '@interfaces';
import { store } from '../../config/reduxConfig';

export default {
	// action to get delivery history list
	deleteComplain: (params: { deliveryId: string, clientId: string, itemId: string, useRedirect?: boolean; }) => (dispatch: Dispatch) => {
		//set loading delivery list
		dispatch({
			type: Dispatches.LOADING_DELIVERY_LIST,
			payload: true,
		});
		// request delivery list data from api
		API.delete<MiscInterface.BE<null>>
			(`${ Endpoints.DELIVERY_COMPLAIN(params.deliveryId, params.clientId, params.itemId) }`)
			.then(response => {
				dispatch({
					type: Dispatches.COMPLAIN_RESULT,
					payload: 'success',
				});
				if (params.useRedirect) NavigationHelper.pop(1);
			})
			.finally(() => {
				// set loading delivery list to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_LIST,
					payload: false,
				});
			});
	},
	updateComplain: (params: DeliveryInterface.IAddComplainDelivery) => (dispatch: Dispatch) => {
		// set loading delivery list
		dispatch({
			type: Dispatches.LOADING_DELIVERY_LIST,
			payload: true,
		});

		// request delivery list data from api
		API.patch
			(`${ Endpoints.DELIVERY_COMPLAIN(params.deliveryId, params.clientId, params.itemId) }`,
				{
					complaint_qty: parseFloat(params.qty),
					complaint_category: params.category,
					complaint_description: params.complaintDescription,
					complaint_follow_up: params.followUp
				})
			.then(response => {
				dispatch({
					type: Dispatches.COMPLAIN_RESULT,
					payload: 'success',
				});
			})
			.finally(() => {
				// set loading delivery list to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_LIST,
					payload: false,
				});
			});
	}
};