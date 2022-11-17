/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { MiscInterface } from '@interfaces';

const initialState: MiscInterface.MiscState = {
	loading: false,
	deviceHeight: 0,
	tmpImageUri: '',
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
		default:
			return state;
	}
};

export default miscReducers;
