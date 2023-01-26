import { Dispatch } from 'redux';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

import { Dispatches, Endpoints } from '@constant';
import { API, NavigationHelper } from '@helpers';
import { DeliveryResponseInterface, DeliveryInterface, MiscInterface, ComponentInterface } from '@interfaces';
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

				// init customers
				let customers: DeliveryInterface.IDeliveryCustomer[] = [];

				// convert api response to delivery list items
				const items: DeliveryInterface.IDelivery[] =
					(response.data as DeliveryResponseInterface.DeliveryListData[])?.map((value) => {
						const delivery = {
							deliveryStatus: value.status,
							deliveryTextStatus: value.text_status,
							id: value.delivery_id.toString(),
							label: value.delivery_no,
							date: value.date,
							status: value.status > 4 ? 'deliver' : 'new',
							totalItem: value.total_item,
							customers: value.clients.map((client) => ({
								id: client.client_no,
								deliveryId: value.delivery_id.toString(),
								custName: client.client_name,
								validated: false,
							})),
							numLocation: Object.keys(value.clients).length,
						};

						// push customers to list
						customers = [...customers, ...delivery.customers];

						return delivery;
					});

				// update delivery list
				dispatch({
					type: Dispatches.SET_DELIVERY_LIST,
					payload: items ?? [],
				});

				// update delivery client list
				dispatch({
					type: Dispatches.SET_DELIVERY_CLIENT,
					payload: customers
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
					numValidated: client.total_item_validate,
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
					.map((client) => {
						// check client where params
						const newClient = { ...client };
						if (client.id == params.clientId && client.deliveryId == params.deliveryId) {
							newClient.validated = true;
							found = true;
						}
						return newClient;
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
				} else {
					// set validate result
					dispatch({
						type: Dispatches.VALIDATE_CLIENT_RESULT,
						payload: false,
					});

					Toast.show({
						type: 'error',
						text1: 'checking client ID ' + params.clientId,
						text2: 'data tidak ditemukan',
						position: 'top'
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

	setValidateClientResult: (value: boolean) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.VALIDATE_CLIENT_RESULT,
			payload: value,
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

				// map response items to state item
				const items2: DeliveryInterface.IDeliveryItem[] = response.data?.items?.map((item) => {
					return {
						id: item.sales_detail_id,
						orderId: item.sales_no ?? '',
						name: item.name ?? '',
						qty: item.qty ?? '',
						validated: item.is_validate,
						validatedTime: item.validate_date,
						deliveryId: params.deliveryId,
						clientId: params.clientId
					};
				}) ?? [];

				dispatch({
					type: Dispatches.SET_CLIENT_ITEMS,
					payload: items2
				});

				// map response carts to state carts
				const carts: DeliveryInterface.IDeliveryCart[] = response.data?.carts?.map((cart) => {
					return {
						id: cart.cart_code ?? '',
						qty: cart.cart_qty ?? 0,
						deliveryId: params.deliveryId,
						clientId: params.clientId
					};
				}) ?? [];

				dispatch({
					type: Dispatches.SET_CLIENT_CARTS,
					payload: carts
				});

				// map response carts to state carts
				const so: DeliveryInterface.IDeliverySO[] = response.data?.sales_numbers?.map((s) => {
					return {
						id: s ?? '',
						name: s ?? 0,
						deliveryId: params.deliveryId,
						clientId: params.clientId
					};
				}) ?? [];

				dispatch({
					type: Dispatches.SET_CLIENT_SO,
					payload: so
				});
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
		const currentItems = [...store.getState().deliveryReducers.clientItems];

		// iterate through current client items
		const items = currentItems.map(
			(item) => {
				if (item.id == id) {
					item.validated = true;
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
			sales_no: item.orderId,
			sales_detail_id: item.id,
			is_validate: true,
		}));

		// request api to validate items
		API.patch<MiscInterface.BE<DeliveryResponseInterface.DeliveryItemResp>>
			(Endpoints.DELIVERY_VALIDATE_ITEMS(params.deliveryId, params.clientId), validatedItems)
			.then((response) => {

				// init data with response type
				const data = response.data as DeliveryResponseInterface.DeliveryItemResp;

				// const newItem = [state.deliveryReducers.clientItems, ...items.map((i) => { i.validated = true; })];

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
						const res = { ...client };
						if (client.id == params.clientId) {
							res.numValidated = items.filter((item) => item.validated && item.clientId == client.id).length;
						}

						return res;
					})
				});

				// set result validate item to true
				dispatch({
					type: Dispatches.STATUS_VALIDATE_CLIENT_ITEMS,
					payload: true
				});
			})
			.catch((error) => {
				// update current client items
				// dispatch({
				// 	type: Dispatches.SET_CLIENT_ITEMS,
				// 	payload: items,
				// });

				// set result validate item to false
				dispatch({
					type: Dispatches.STATUS_VALIDATE_CLIENT_ITEMS,
					payload: false
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
	},

	inputKms: (params: DeliveryInterface.IInputKmParams) => (dispatch: Dispatch) => {
		// set loading input km
		dispatch({
			type: Dispatches.LOADING_INPUT_KM,
			payload: true
		});

		// create form data
		const formData = new FormData();
		formData.append('start_odometer_image', {
			uri: params?.imageUrl ?? 'test',
			name: 'test.jpg',
			type: 'image/jpeg',
		} as any);
		formData.append('start_lat', params.lat);
		formData.append('start_long', params.long);
		formData.append('start_odometer', params.odo);
		formData.append('start_location', params.location ?? '');

		API.upload(
			Endpoints.INPUT_KM(params.deliveryId),
			formData
		)
			.then((response) => {

				// update delivery status
				const deliveries = store.getState().deliveryReducers.deliveryList.map((delivery) => {
					if (delivery.id == params.deliveryId) {
						delivery.status = 'deliver';
					}

					return delivery;
				});

				dispatch({
					type: Dispatches.SET_DELIVERY_LIST,
					payload: deliveries
				});

				NavigationHelper.reset('Delivery');
			})
			.catch((error) => {

			})
			.finally(() => {
				// set loading input km to false
				dispatch({
					type: Dispatches.LOADING_INPUT_KM,
					payload: false
				});
			});
	},

	// action to get delivery history list
	getDeliveryHistory: () => (dispatch: Dispatch) => {
		// set loading delivery list
		dispatch({
			type: Dispatches.LOADING_DELIVERY_LIST,
			payload: true,
		});

		// request delivery list data from api
		API.get<MiscInterface.BE<DeliveryResponseInterface.DeliveryHistoryList[]>>
			(`${ Endpoints.DELIVERY_HISTORY_LIST }`)
			.then(response => {

				if (response.data) {
					//maping BE response into existing type
					const deliveryItems: DeliveryInterface.IDeliveryHistory[] = (response.data as DeliveryResponseInterface.DeliveryHistoryList[]).map(item => {
						return {
							id: item.delivery_id,
							customers: undefined, // have to request to BE to provide this properties
							status: item.text_status, // TBD
							date: item.date,
							totalItem: item.item_order,
							totalAccepted: item.item_receive,
							totalReturned: item.item_reject,
							deliveryNumber: item.delivery_no,
							deliveryStatus: item.status,
							deliveryStatusText: item.text_status,
						};
					});
					dispatch({
						type: Dispatches.SET_DELIVERY_HISTORY,
						payload: deliveryItems,
					});
				} else {
					Toast.show({
						type: 'error',
						text1: 'Oopps...',
						text2: 'Get History has Empty Data',
					});
				}

			})
			.finally(() => {
				// set loading delivery list to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_LIST,
					payload: false,
				});
			});
	},

	getDeliveryHistoryRouteDetail: (deliveryId: string, clientId: string) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_DELIVERY_LIST,
			payload: true,
		});
		// request client delivery list data from api
		API.get<MiscInterface.BE<DeliveryResponseInterface.ClientDeliveryHistoryDetail>>
			(`${ Endpoints.DELIVERY_HISTORY_CLIENT_DETAIL(deliveryId, clientId) }`)
			.then(response => {
				if (response.data) {

					//maping BE response into existing type
					const clientHistoryDetail: DeliveryInterface.IHistoryDetail =
					{
						header: {
							clientId: response.data.client_no,
							address: response.data.client_address,
							name: response.data.client_name,
							time: response.data.frame_time
						},
						item: response.data.items ? response.data.items.map(item => {
							return {
								id: item.sales_no,
								name: item.item_name,
								isComplain: item.complaint_notes ? true : false,
								complainAmount: item.qty_reject + '',
								complainLabel: item.qty_order + '',
								complainDesc: item.complaint_notes
							};
						}) : null,
						receipt: {
							name: response.data.receipt.received_name,
							date: response.data.receipt.received_date,
							photo: response.data.receipt.photo
						}

					};

					dispatch({
						type: Dispatches.SET_DELIVERY_HISTORY_DETAIL,
						payload: clientHistoryDetail,
					});

				} else {
					Toast.show({
						type: 'error',
						text1: 'Oopps...',
						text2: 'Get History Detail has Empty Data',
					});
				}
			})
			.finally(() => {
				// set loading delivery list to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_LIST,
					payload: false,
				});
			});
	},

	getDeliveryHistoryRoute: (deliveryId: string) => (dispatch: Dispatch) => {

		dispatch({
			type: Dispatches.LOADING_DELIVERY_LIST,
			payload: true,
		});
		// request client delivery list data from api
		API.get<MiscInterface.BE<DeliveryResponseInterface.ClientDeliveryHistoryList[]>>
			(`${ Endpoints.DELIVERY_HISTORY_ROUTE(deliveryId) }`)
			.then(response => {

				if (response.data) {

					//count data
					let dataCount: number = 0;
					if (response.data.length) {
						dataCount = response.data.length;
					}
					//maping BE response into existing type
					const clientRoutes: DeliveryInterface.IDeliveryCustomer[] = (response.data as DeliveryResponseInterface.ClientDeliveryHistoryList[]).map((route, index) => {
						const time = route.frame_time.split('-');
						return {
							id: route.client_no,
							deliveryId: deliveryId,
							custName: route.client_name,
							validated: true,
							numItem: route.item_order,
							numValidated: route.item_receive,
							deliveryTime: route.frame_time,
							address: route.client_address,
							latitude: route.client_lat,
							longitude: route.client_long,
							sequence: route.delivery_sequence,
							status: route.delivery_status,
							statusLabel: route.text_delivery_status
						};
					});
					dispatch({
						type: Dispatches.SET_DELIVERY_HISTORY_ROUTE,
						payload: clientRoutes,
					});

				} else {
					Toast.show({
						type: 'error',
						text1: 'Oopps...',
						text2: 'Get History Detail has Empty Data',
					});
				}
			})
			.finally(() => {
				// set loading delivery list to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_LIST,
					payload: false,
				});
			});
	},

	getDeliveryProcess: (deliveryId: string) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_DELIVERY_PROCESS,
			payload: true,
		});
		// request client delivery list data from api
		API.get<MiscInterface.BE<DeliveryResponseInterface.ClientDeliveryHistoryList[]>>
			(`${ Endpoints.DELIVERY_PROCESS(deliveryId) }`)
			.then(response => {
				if (response.data) {
					dispatch({
						type: Dispatches.SET_DELIVERY_PROCESS,
						payload: {
							deliveryId: deliveryId,
							data: response.data
						}
					});
				} else {
					Toast.show({
						type: 'error',
						text1: 'Oopps...',
						text2: 'Failed to get delivery detail',
					});
				}
			})
			.catch()
			.finally(() => {
				() => {
					// set loading delivery list to false
					dispatch({
						type: Dispatches.LOADING_DELIVERY_PROCESS,
						payload: false,
					});
				};
			});
	},

	startDeliveryClient: (deliveryId: string, clientId: string) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_START_DELIVERY_CLIENT,
			payload: true,
		});
		// request client delivery list data from api
		API.post(`${ Endpoints.START_DELIVERY_CLIENT(deliveryId, clientId) }`, [])
			.then(response => {
				// update client status to 1

				//REQ_BE: need BE to provide response newest RouteMap data

				dispatch({
					type: Dispatches.UPDATE_DELIVERY_CLIENT_STATUS,
					payload: {
						id: clientId,
						custDeliveryId: deliveryId,
						status: 5
					}
				});
			})
			.finally(() => {
				// set loading delivery list to false
				dispatch({
					type: Dispatches.LOADING_START_DELIVERY_CLIENT,
					payload: false,
				});
			});
	},
	// action to tell BE just arrived
	justArrived: (deliveryId: string, clientId: string) => (dispatch: Dispatch) => {
		// set loading arrival process
		dispatch({
			type: Dispatches.ARRIVAL_LOADING,
			payload: true,
		});

		// tell BE, driver just arrived
		API.post<MiscInterface.BE<DeliveryResponseInterface.DeliveryHistoryList[]>>
			(`${ Endpoints.JUST_ARRIVE(deliveryId, clientId) }`, [])
			.then(response => {
				NavigationHelper.push('DeliveryCheck', { deliveryId, clientId });
			})
			.finally(() => {
				// turn off loading arrival process
				dispatch({
					type: Dispatches.ARRIVAL_LOADING,
					payload: false,
				});
			});
	},

	// action to get delivery process data
	getDeliveryProcessList: () => (dispatch: Dispatch) => {
		// set loading arrival process
		dispatch({
			type: Dispatches.ARRIVAL_LOADING,
			payload: true,
		});

		// request delivery process from api
		API.get<MiscInterface.BE<DeliveryResponseInterface.DeliveryHistoryList[]>>
			(`${ Endpoints.GET_DELIVERY_PROCESS }`)
			.then(response => {

				if (response.data) {
					//maping BE response into existing type

				} else {
					Toast.show({
						type: 'error',
						text1: 'Oopps...',
						text2: 'delivery process has Empty Data',
					});
				}

			})
			.finally(() => {
				// turn off loading arrival process
				dispatch({
					type: Dispatches.ARRIVAL_LOADING,
					payload: false,
				});
			});
	},
	arrivalConfirmation: (params: DeliveryInterface.IArrivalConfirmation) => (dispatch: Dispatch) => {
		// set loading input km
		dispatch({
			type: Dispatches.ARRIVAL_LOADING,
			payload: true
		});

		// create form data
		const formData = new FormData();
		formData.append('image', {
			uri: params?.imageUrl ?? 'test',
			name: 'test.jpg',
			type: 'image/jpeg',
		} as any);
		formData.append('recipient_name', params.recipientName);
		formData.append('carts', params.carts?.join(';') ?? '');
		formData.append('need_confirm', params.needConfirm ? 'true' : 'false');
		formData.append('need_confirm_notes', params.needConfirmNote ? params.needConfirmNote : '');

		API.upload(
			Endpoints.ARRIVAL_CONFIRMATION(params.deliveryId, params.clientId),
			formData
		)
			.then((response) => {
				// show success dialog
				const date = new Date();
				dispatch({
					type: Dispatches.ARRIVAL_CONFIRMATION_SUCCESS,
					payload: {
						deliveryId: params.deliveryId,
						clientId: params.clientId,
						clientName: params.clientName,
						time: date.getHours() + ':' + date.getMinutes()
					}
				});
			})
			.catch((error) => {

			})
			.finally(() => {
				// set loading input km to false
				dispatch({
					type: Dispatches.ARRIVAL_LOADING,
					payload: false
				});
			});
	},
	getClientArrivalData: (deliveryId: string, clientId: string) => (dispatch: Dispatch) => {
		// set loading arrival process
		dispatch({
			type: Dispatches.ARRIVAL_LOADING,
			payload: true,
		});

		// request delivery process from api
		API.get<MiscInterface.BE<DeliveryResponseInterface.ClientArrivalResponse>>
			(`${ Endpoints.CLIENT_ARRIVAL(deliveryId, clientId) }`)
			.then(response => {

				if (response.data) {
					//maping BE response into existing type

					dispatch({
						type: Dispatches.CLIENT_ARRIVAL_DATA,
						payload: response.data,
					});
				} else {
					Toast.show({
						type: 'error',
						text1: 'Oopps...',
						text2: 'delivery process has Empty Data',
					});
				}

			})
			.finally(() => {
				// turn off loading arrival process
				dispatch({
					type: Dispatches.ARRIVAL_LOADING,
					payload: false,
				});
			});
	},
	closeSuccessArrivalConfirmationDialog: () => {
		return {
			type: Dispatches.ARRIVAL_CONFIRMATION_SUCCESS,
			payload: null,
		};
	},
	deliveryFinish: (params: DeliveryInterface.IDeliveryFinish) => (dispatch: Dispatch) => {

		// set loading input km
		dispatch({
			type: Dispatches.LOADING_INPUT_KM,
			payload: true
		});

		const formData = new FormData();
		formData.append('finish_odometer_image', {
			uri: params.finishOdometer_image,
			name: 'finish' + '_' + params.deliveryId + '.jpg',
			type: 'image/jpeg',
		} as any);
		formData.append('finish_location', params.finishLocation);
		formData.append('finish_lat', params.lat + '');
		formData.append('finish_long', params.long + '');
		formData.append('finish_odometer', params.odometer + '');


		API.upload(
			Endpoints.INPUT_KM_FINISH(params.deliveryId),
			formData
		)
			.then((response) => {

				NavigationHelper.reset('Delivery');
			})
			.catch((error) => {

			})
			.finally(() => {
				// set loading input km to false
				dispatch({
					type: Dispatches.LOADING_INPUT_KM,
					payload: false
				});
			});
	},

	addComplaint: (params: DeliveryInterface.IAddComplainDelivery) => (dispatch: Dispatch) => {
		// set loading input km
		dispatch({
			type: Dispatches.LOADING_COMPLAIN,
			payload: true
		});

		const formData = new FormData();
		// convert string array to string obj like Blob model
		const imageObj = params.complainImageUrl.map((img, index) => ({
			uri: img,
			name: params.itemId + '_' + index + '.jpeg',
			type: 'image/jpeg'
		}));

		// forming multiple file upload
		[...imageObj].forEach(image => {
			formData.append("complaint_images", image as any);
		});

		formData.append('complaint_description', params.complaintDescription);
		formData.append('delivery_route_item_id', params.itemId);
		formData.append('complaint_qty', params.qty);
		formData.append('complaint_category', params.category);
		formData.append('complaint_follow_up', params.followUp);
		formData.append('received_qty', params.receivedQty);

		API.upload(
			Endpoints.ADD_COMPLAINT(params.deliveryId, params.clientId),
			formData
		)
			.then((response) => {

				dispatch({
					type: Dispatches.CLIENT_ARRIVAL_DATA,
					payload: response.data,
				});
				dispatch({
					type: Dispatches.COMPLAIN_RESULT,
					payload: 'success',
				});

			})
			.catch((error: AxiosError) => {
				const errorData: any = error.response?.data ? error.response?.data : null;
				dispatch({
					type: Dispatches.COMPLAIN_RESULT,
					payload: errorData ? errorData.stat_msg : 'complain error',
				});
			})
			.finally(() => {
				// set loading input km to false
				dispatch({
					type: Dispatches.LOADING_COMPLAIN,
					payload: false
				});
			});
	},

	submitDeliveryIssue: (deliveryId: string, complain: DeliveryInterface.IComplain) => (dispatch: Dispatch) => {
		// set loading submit delivery issue
		dispatch({
			type: Dispatches.LOADING_DELIVERY_ISSUE,
			payload: true
		});

		const formData = new FormData();
		formData.append('title', complain.title ?? '');
		formData.append('description', complain.description ?? '');
		formData.append('image', {
			uri: complain.image ?? 'test',
			name: 'complain.jpg',
			type: 'image/jpeg',
		} as any);

		API.upload(Endpoints.DELIVERY_PROCESS(deliveryId), formData)
			.then(() => {
				// set result submit delivery issue
				dispatch({
					type: Dispatches.RESULT_DELIVERY_ISSUE,
					payload: true
				});
			})
			.catch(() => {
				// set result submit delivery issue
				dispatch({
					type: Dispatches.RESULT_DELIVERY_ISSUE,
					payload: false
				});
			})
			.finally(() => {
				// set finish loading submit delivery issue
				dispatch({
					type: Dispatches.LOADING_DELIVERY_ISSUE,
					payload: false
				});
			})
			;
	},

	setDeliveryIssueResult: (value: boolean | undefined) => (dispatch: Dispatch) => {
		// set result submit delivery issue
		dispatch({
			type: Dispatches.RESULT_DELIVERY_ISSUE,
			payload: value
		});
	},
};
