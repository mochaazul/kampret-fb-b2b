import { Dispatch } from 'redux';

import { Dispatches, Endpoints } from '@constant';
import { API } from '@helpers';
import { DeliveryResponseInterface, DeliveryInterface, MiscInterface } from '@interfaces';

export default {
	getDeliveryList: () => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_DELIVERY_LIST,
			payload: true,
		});
		API.get<MiscInterface.BE<DeliveryResponseInterface.DeliveryListData[]>>
			(`${ Endpoints.DELIVERY_LIST }`)
			.then(response => {
				dispatch({
					type: Dispatches.CLEAR_DELIVERY_LIST,
				});

				// convert api response to delivery list items
				const items: DeliveryInterface.IDelivery[] =
					(response.data as DeliveryResponseInterface.DeliveryListData[])?.map((value) => {
						return {
							id: value.delivery_id.toString(),
							date: value.date,
							status: 'new',
							totalItem: value.total_item,
							customers: value.clients.map((value) => ({
								id: value.client_no,
								custName: value.client_name,
								validated: false,
							})),
							numLocation: Object.keys(value.clients).length,
						};
					});

				dispatch({
					type: Dispatches.SET_DELIVERY_LIST,
					payload: items ?? [],
				});
			})
			.catch(() => {
			})
			.finally(() => {
				dispatch({
					type: Dispatches.LOADING_DELIVERY_LIST,
					payload: false,
				});
			});
	},
};
