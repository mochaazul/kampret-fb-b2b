/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeliveryInterface, DeliveryResponseInterface } from '@interfaces';
import { Dispatches } from '@constant';

const initialState: DeliveryInterface.DeliveryState = {
	deliveryList: [],
	loadingList: false,
	clientValidation: [],
	loadingClient: false,
	loadingValidateClient: false,
	resultValidateClient: undefined,
	clientItems: [],
	loadingClientItem: undefined,
	loadingValidateItem: undefined,
	statusValidateItem: undefined,
	loadingInputKm: undefined,
	statusInputKm: undefined,
	deliveryHistory: undefined,
	deliveryHistoryRoute: undefined,
	deliveryHistoryRouteDetail: undefined,
	loadingDeliveryProcess: undefined
};

type Actions = { type: string; payload: any; };

const deliveryReducers = (
	state = initialState,
	action: Actions,
): DeliveryInterface.DeliveryState => {
	const { type, payload } = action;
	switch (type) {
		// delivery list actions
		case Dispatches.LOADING_DELIVERY_LIST:
			return {
				...state,
				loadingList: payload,
			};
		case Dispatches.SET_DELIVERY_LIST:
			return {
				...state,
				deliveryList: payload,
			};
		case Dispatches.CLEAR_DELIVERY_LIST:
			return {
				...state,
				deliveryList: [],
			};

		// delivery client actions
		case Dispatches.SET_DELIVERY_CLIENT:
			return {
				...state,
				clientValidation: [...payload],
			};
		case Dispatches.LOADING_DELIVERY_CLIENT:
			return {
				...state,
				loadingClient: payload,
			};
		case Dispatches.LOADING_VALIDATE_CLIENT:
			return {
				...state,
				loadingClient: payload,
			};
		case Dispatches.VALIDATE_CLIENT_RESULT:
			return {
				...state,
				resultValidateClient: payload,
			};

		// client items actions
		case Dispatches.LOADING_CLIENT_ITEMS:
			return {
				...state,
				loadingClientItem: payload,
			};
		case Dispatches.LOADING_VALIDATE_CLIENT_ITEMS:
			return {
				...state,
				loadingValidateItem: payload,
			};
		case Dispatches.STATUS_VALIDATE_CLIENT_ITEMS:
			return {
				...state,
				statusValidateItem: payload,
			};
		case Dispatches.SET_CLIENT_ITEMS:
			return {
				...state,
				clientItems: [...payload],
			};

		case Dispatches.LOADING_INPUT_KM:
			return {
				...state,
				loadingInputKm: payload,
			};
		case Dispatches.STATUS_INPUT_KM:
			return {
				...state,
				statusInputKm: payload,
			};

		case Dispatches.SET_DELIVERY_HISTORY:
			return {
				...state,
				deliveryHistory: payload
			};
		case Dispatches.SET_DELIVERY_HISTORY_ROUTE:
			return {
				...state,
				deliveryHistoryRoute: payload
			};
		case Dispatches.SET_DELIVERY_HISTORY_DETAIL:
			return {
				...state,
				deliveryHistoryRouteDetail: payload
			};
		case Dispatches.LOADING_DELIVERY_PROCESS:
			return {
				...state,
				loadingDeliveryProcess: payload
			};
		case Dispatches.SET_DELIVERY_PROCESS:
			const { deliveryId, data } = payload;
			const clients =
				(data as DeliveryResponseInterface.DeliveryProcessData[]).map((resp) => {
					return {
						id: resp.client_no,
						deliveryId: deliveryId,
						custName: resp.client_name,
						validated: true,
						address: resp.client_address,
						deliveryTime: resp.frame_time,
						status: resp.delivery_status,
						sequence: resp.delivery_sequence,
						statusLabel: resp.text_delivery_status,
						numItem: resp.item_order
					};
				});
			return {
				...state,
				loadingDeliveryProcess: false,
				clientValidation: [...clients]
			};
		case Dispatches.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default deliveryReducers;
