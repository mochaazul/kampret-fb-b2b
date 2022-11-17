import { Dispatches } from '@constant';

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
};
