/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { MiscInterface } from '@interfaces';

const initialState: MiscInterface.MiscState = {
	loading: false,
	deviceHeight: 0,
	tmpImageUri: '',
	notif: false,
	currentLatitude: undefined,
	currentLongitude: undefined,
	locationStatus: 'loading',
	tmpMultiplePhotoCaptures: null,
	deliveryIssueTitle: '',
	deliveryIssueDesc: '',
	tmpDeliveryComplainResult: null,
	uploadProgress: undefined
};

type Actions = { type: string; payload: any; };

const miscReducers = (
	state = initialState,
	action: Actions,
): MiscInterface.MiscState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.API_LOADING_START:
			return {
				...state,
				loading: true,
			};
		case Dispatches.API_LOADING_END:
			return {
				...state,
				loading: false,
			};
		case Dispatches.SET_DEVICE_HEIGHT:
			return {
				...state,
				deviceHeight: payload,
			};
		case Dispatches.TMP_IMAGE_URI:
			return {
				...state,
				tmpImageUri: payload,
			};
		case Dispatches.TMP_NOTIF:
			return {
				...state,
				notif: payload,
			};
		case Dispatches.STATUS_LOCATION:
			return {
				...state,
				locationStatus: payload,
			};
		case Dispatches.SET_LATITUDE:
			return {
				...state,
				currentLatitude: payload,
			};
		case Dispatches.SET_LONGITUDE:
			return {
				...state,
				currentLongitude: payload,
			};
		case Dispatches.TMP_MULTIPLE_IMAGE:
			return {
				...state,
				tmpMultiplePhotoCaptures: payload,
			};
		case Dispatches.SET_DELIVERY_ISSUE_TITLE:
			return {
				...state,
				deliveryIssueTitle: payload,
			};
		case Dispatches.COMPLAIN_RESULT:
			return {
				...state,
				tmpDeliveryComplainResult: payload,
			};
		case Dispatches.SET_DELIVERY_ISSUE_DESC:
			return {
				...state,
				deliveryIssueDesc: payload,
			};
		case Dispatches.API_UPLOAD_PROGRESS:

			return {
				...state,
				uploadProgress: payload,
			};
		default:
			return state;
	}
};

export default miscReducers;
