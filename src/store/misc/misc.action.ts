import { Dispatch } from 'redux';
import { Dispatches } from '@constant';
import { MiscInterface } from '@interfaces';

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
};
