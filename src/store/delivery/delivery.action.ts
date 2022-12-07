import { Dispatch } from 'redux';

import { Dispatches, Endpoints } from '@constant';
import { API } from '@helpers';
import { DeliveryResponseInterface, DeliveryInterface, MiscInterface } from '@interfaces';
import { store } from '../../config/reduxConfig';

export default {
	// action to get delivery list
	getDeliveryList: () => (dispatch: Dispatch) => {
		// set loading delivery list
		dispatch({
			type: Dispatches.LOADING_DELIVERY_LIST,
			payload: true,
		});

		// request delivery list data from api
		API.get<MiscInterface.BE<DeliveryResponseInterface.DeliveryListData[]>>
			(`${ Endpoints.DELIVERY_LIST }`)
			.then(response => {

				// clear current delivery list state
				dispatch({
					type: Dispatches.CLEAR_DELIVERY_LIST,
				});

				// convert api response to delivery list items
				const items: DeliveryInterface.IDelivery[] =
					(response.data as DeliveryResponseInterface.DeliveryListData[])?.map((value) => {
						const delivery = {
							id: value.delivery_id.toString(),
							date: value.date,
							status: 'new',
							totalItem: value.total_item,
							customers: value.clients.map((client) => ({
								id: client.client_no,
								deliveryId: value.delivery_id.toString(),
								custName: client.client_name,
								validated: false,
							})),
							numLocation: Object.keys(value.clients).length,
						};

						// update delivery client list
						dispatch({
							type: Dispatches.SET_DELIVERY_CLIENT,
							payload: delivery.customers
						});

						return delivery;
					});

				// update delivery list
				dispatch({
					type: Dispatches.SET_DELIVERY_LIST,
					payload: items ?? [],
				});
			})
			.finally(() => {
				// set loading delivery list to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_LIST,
					payload: false,
				});
			});
	},

	// action to get client from delivery
	getDeliveryClient: (deliveryId: string) => (dispatch: Dispatch) => {
		// set loading client
		dispatch({
			type: Dispatches.LOADING_DELIVERY_CLIENT,
			payload: true,
		});
		API.get<MiscInterface.BE<DeliveryResponseInterface.DeliveryClientData[]>>
			(`${ Endpoints.DELIVERY_CLIENT(deliveryId) }`)
			.then(response => {

				// init data with response type
				const data = response.data as DeliveryResponseInterface.DeliveryClientData[];

				// convert api response to delivery client
				const items = data.map((client) => ({
					id: client.client_no,
					deliveryId: deliveryId,
					custName: client.client_name,
					validated: client.is_client_validate,
					numItem: client.total_item,
				}));

				// update current delivery clients in states
				dispatch({
					type: Dispatches.SET_DELIVERY_CLIENT,
					payload: items,
				});

			})
			.finally(() => {
				// set loading client to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_CLIENT,
					payload: false,
				});
			});
	},

	// action to validate client
	validateClient: (params: DeliveryInterface.IDeliveryClientParams) => (dispatch: Dispatch) => {
		// set loading delivery client
		dispatch({
			type: Dispatches.LOADING_VALIDATE_CLIENT,
			payload: true,
		});

		// set validate result
		dispatch({
			type: Dispatches.VALIDATE_CLIENT_RESULT,
			payload: undefined,
		});

		// request api to validate client
		API.patch(`${ Endpoints.VALIDATE_CLIENT(params.deliveryId, params.clientId) }`)
			.then(() => {
				// get current state
				const state = store.getState();

				let found = false;

				// iterate through client
				const clients = state
					.deliveryReducers
					.clientValidation
					.map((value) => {
						// check client where params
						if (value.id == params.clientId && value.deliveryId == params.deliveryId) {
							value.validated = true;
							found = true;
						}
						return value;
					});

				if (found) {
					// dispatch updated client to state
					dispatch({
						type: Dispatches.SET_DELIVERY_CLIENT,
						payload: clients,
					});

					// set validate result
					dispatch({
						type: Dispatches.VALIDATE_CLIENT_RESULT,
						payload: true,
					});
				}
			})
			.catch((err) => {
				// set validate result
				dispatch({
					type: Dispatches.VALIDATE_CLIENT_RESULT,
					payload: false,
				});
			})
			.finally(() => {
				// set loading false delivery client
				dispatch({
					type: Dispatches.LOADING_VALIDATE_CLIENT,
					payload: false,
				});
			});
	},

	// actions to get client items
	getClientItems: (params: DeliveryInterface.IDeliveryClientParams) => (dispatch: Dispatch) => {
		// set loading client item
		dispatch({
			type: Dispatches.LOADING_CLIENT_ITEMS,
			payload: true,
		});

		// request client item data to api
		API.get<MiscInterface.BE<DeliveryResponseInterface.DeliveryItemResp>>
			(Endpoints.DELIVERY_CLIENT_ITEMS(params.deliveryId, params.clientId))
			.then((response) => {

				// init data with response type
				const data = response.data as DeliveryResponseInterface.DeliveryItemResp;

				// get current items
				const currentItem = store.getState().deliveryReducers.clientItems;

				// inc validated item
				let numValidated = 0;

				// convert api response to delivery client
				const items = data.items.map((item) => {
					if (item.is_validate) numValidated++;

					return {
						id: item.sales_detail_id,
						orderId: item.sales_no,
						qty: item.qty,
						name: item.name,
						validated: currentItem.find((v) => v.id == item.sales_detail_id && v.validated)?.validated ?? item.is_validate,
						validatedTime: item.validate_date,
						deliveryId: params.deliveryId,
						clientId: params.clientId
					};
				});

				// set client item state
				dispatch({
					type: Dispatches.SET_CLIENT_ITEMS,
					payload: items,
				});

				if (numValidated) {
					dispatch({
						type: Dispatches.SET_DELIVERY_CLIENT,
						payload: store.getState().deliveryReducers.clientValidation.map((client) => {
							if (client.id == params.clientId)
								client.numValidated = numValidated;

							return client;
						})
					});
				}
			})
			.catch(() => { })
			.finally(() => {
				// set loading client item to false
				dispatch({
					type: Dispatches.LOADING_CLIENT_ITEMS,
					payload: false,
				});
			});
	},

	setItem: (items: DeliveryInterface.IDeliveryItem[]) => (dispatch: Dispatch) => {
		// update current client items
		dispatch({
			type: Dispatches.SET_CLIENT_ITEMS,
			payload: items,
		});
	},

	// action to validate item locally
	validateItem: (id: string) => (dispatch: Dispatch) => {
		// iterate through current client items
		const items = store.getState().deliveryReducers.clientItems.map(
			(item) => {
				if (item.id == id) {
					item.validated = !item.validated;
				}

				return item;
			}
		);

		// update current client items
		dispatch({
			type: Dispatches.SET_CLIENT_ITEMS,
			payload: items,
		});
	},

	// action to validate item locally
	validateBulk: (params: DeliveryInterface.IDeliveryClientParams) => (dispatch: Dispatch) => {
		// set loading validate item
		dispatch({
			type: Dispatches.LOADING_VALIDATE_CLIENT_ITEMS,
			payload: true
		});

		// set result validate item to false
		dispatch({
			type: Dispatches.STATUS_VALIDATE_CLIENT_ITEMS,
			payload: false
		});

		// get current state
		const state = store.getState();

		// get items validated locally
		const items = state
			.deliveryReducers
			.clientItems.filter((item) => item.clientId == params.clientId && item.validated);

		// map items to req body
		const validatedItems: Array<any> = items.map((item) => ({
			sales_detail_id: item.id,
			is_validate: true,
		}));

		// request api to validate items
		API.patch<MiscInterface.BE<DeliveryResponseInterface.DeliveryItemResp>>
			(Endpoints.DELIVERY_VALIDATE_ITEMS(params.deliveryId, params.clientId), validatedItems)
			.then((response) => {

				// init data with response type
				const data = response.data as DeliveryResponseInterface.DeliveryItemResp;

				// loop through current items
				const items = state.deliveryReducers.clientItems.map((item) => {
					// check if item is on result
					const resItem = data.items.find((res) => res.sales_detail_id == item.id);

					if (resItem) {
						item.validated = resItem.is_validate;
						item.validatedTime = resItem.validate_date;
					}

					return item;
				});

				// update current client items
				dispatch({
					type: Dispatches.SET_CLIENT_ITEMS,
					payload: items,
				});

				// update client num validated items
				dispatch({
					type: Dispatches.SET_DELIVERY_CLIENT,
					payload: state.deliveryReducers.clientValidation.map((client) => {
						if (client.id == params.clientId)
							client.numValidated = items.filter((item) => item.validated && item.clientId == client.id).length;

						return client;
					})
				});

				// set result validate item to true
				dispatch({
					type: Dispatches.STATUS_VALIDATE_CLIENT_ITEMS,
					payload: true
				});
			})
			.catch(() => {
				// update current client items
				dispatch({
					type: Dispatches.SET_CLIENT_ITEMS,
					payload: items,
				});
			})
			.finally(() => {
				// set loading validate item to false
				dispatch({
					type: Dispatches.LOADING_VALIDATE_CLIENT_ITEMS,
					payload: false
				});
			});
	},

	setStatusValidateItem: (value: boolean | undefined) => (dispatch: Dispatch) => {
		// set result validate item to true
		dispatch({
			type: Dispatches.STATUS_VALIDATE_CLIENT_ITEMS,
			payload: value
		});
	}
};
