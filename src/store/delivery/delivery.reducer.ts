/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactInterface, DeliveryInterface } from '@interfaces';
import { Dispatches } from '@constant';

const initialState: DeliveryInterface.DeliveryState = {
	deliveryList: [],
	loadingList: false,
};

type Actions = { type: string; payload: any; };

const deliveryReducers = (
	state = initialState,
	action: Actions,
): DeliveryInterface.DeliveryState => {
	const { type, payload } = action;
	switch (type) {
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
		case Dispatches.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default deliveryReducers;
