import { Dispatch } from 'redux';

import { Dispatches, Endpoints } from '@constant';
import { MiscInterface } from '@interfaces';
import { API, NavigationHelper } from '@helpers';

import { CheckItemProp } from '../../screens/DeliveryCheck/CheckItem';

export default {
	startLoader: () => {
		return {
			type: Dispatches.API_LOADING_START,
		};
	},
	endLoader: () => {
		return {
			type: Dispatches.API_LOADING_END,
		};
	},
	setDeviceHeight: (deviceHeight: number) => {
		return {
			type: Dispatches.SET_DEVICE_HEIGHT,
			payload: deviceHeight,
		};
	},
	setTmpImageUri: (imageUri: string) => {
		return {
			type: Dispatches.TMP_IMAGE_URI,
			payload: imageUri,
		};
	},
	setTmpMultiplePhotoCapture: (multiplePhotoCapture: MiscInterface.MultiplePhotoCapture) => {
		return {
			type: Dispatches.TMP_MULTIPLE_IMAGE,
			payload: multiplePhotoCapture,
		};
	},
	setNotif: (notif: boolean) => {
		return {
			type: Dispatches.TMP_NOTIF,
			payload: notif,
		};
	},

	setLocationStatus: (status: string) => ({
		type: Dispatches.STATUS_LOCATION,
		payload: status,
	}),
	setLatitude: (latitude: number) => ({
		type: Dispatches.SET_LATITUDE,
		payload: latitude,
	}),
	setLongitude: (longitude: number) => ({
		type: Dispatches.SET_LONGITUDE,
		payload: longitude,
	}),
	clearLocation: () => (dispatch: Dispatch) => {
		// set status loading
		dispatch({
			type: Dispatches.STATUS_LOCATION,
			payload: 'loading',
		});

		// clear latitude
		dispatch({
			type: Dispatches.SET_LATITUDE,
			payload: undefined,
		});

		// clear longitude
		dispatch({
			type: Dispatches.SET_LONGITUDE,
			payload: undefined,
		});
	},
	setDeliveryIssueTitle: (value: string) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_DELIVERY_ISSUE_TITLE,
			payload: value,
		});
	},
	setDeliveryIssueDesc: (value: string) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_DELIVERY_ISSUE_DESC,
			payload: value,
		});
	},
	setDeliveryComplainResult: (value: string | null) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.COMPLAIN_RESULT,
			payload: value,
		});
	},
	setArrivalCheckItems: (data: CheckItemProp[] | null) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_TEMP_ARRIVAL_CHECKITEMS,
			payload: data,
		});
	},
	clearArrivalData: () => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.CLIENT_ARRIVAL_DATA,
			payload: null,
		});
	},
	getStartOdometer: (params: { deliveryId: string, deliveryLocation: string; }) => (dispatch: Dispatch) => {
		//set loading delivery route
		dispatch({
			type: Dispatches.LOADING_DELIVERY_PROCESS,
			payload: true
		});
		// request odometer data from api
		API.get<MiscInterface.BE<MiscInterface.OdometerResponse>>
			(`${ Endpoints.DELIVERY(params.deliveryId) }`)
			.then(response => {
				if (response.data) {
					NavigationHelper.push('InputKms', {
						deliveryId: params.deliveryId,
						deliveryLocation: params.deliveryLocation,
						existingStartKm: response.data.start_odometer
					});
				}
			})
			.finally(() => {
				// set loading delivery route to false
				dispatch({
					type: Dispatches.LOADING_DELIVERY_PROCESS,
					payload: false
				});
			});
	},
};
