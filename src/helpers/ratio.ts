/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dimensions, Platform, StatusBar } from 'react-native';
import { store } from '../config/reduxConfig';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isIphoneX = () => {
	const dimen = Dimensions.get('window');
	return (
		Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    ((dimen.height === 780 || dimen.width === 780)
      || (dimen.height === 812 || dimen.width === 812)
      || (dimen.height === 844 || dimen.width === 844)
      || (dimen.height === 896 || dimen.width === 896)
      || (dimen.height === 926 || dimen.width === 926))
	);
};

const normalizePercent = (percent: number) => {
	const { height, width } = Dimensions.get('window');
	const standardLength = width > height ? width : height;
	const offset: any =
    width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

	const deviceHeight =
    isIphoneX() || Platform.OS === 'android' ? standardLength - offset : standardLength;

	const heightPercent = (percent * deviceHeight) / 100;
	return Math.round(heightPercent);
};

const normalizeValue = (fontSize: number, standardScreenHeight = 812) => {
	const state = store.getState();

	const heightPercent = (fontSize * state.miscReducers.deviceHeight) / standardScreenHeight;
	return Math.round(heightPercent);
};

const getDeviceHeight = () => {
	const { height, width } = Dimensions.get('window');
	const standardLength = width > height ? width : height;
	const offset:any = width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

	return isIphoneX() || Platform.OS === 'android' ? standardLength - offset : standardLength;
};

export default {
	screenWidth,
	screenHeight,
	normalizeValue,
	normalizePercent,
	getDeviceHeight,
};
