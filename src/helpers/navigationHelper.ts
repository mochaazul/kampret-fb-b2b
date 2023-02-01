
import { createNavigationContainerRef, StackActions, CommonActions } from '@react-navigation/native';

import { ScreenNameType } from '../router/screens';

export const navigationRef = createNavigationContainerRef();

export function push(name: ScreenNameType, params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(StackActions.push(name, params));
	}
}

export function replace(name: ScreenNameType, params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(StackActions.replace(name, params));
	}
}

export function reset(name: ScreenNameType, params?: object, index: number = 0) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(CommonActions.reset({
			index: index,
			routes: [
				{ name, params },
			],
		}));
	}
}

export function pop(count: number) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(StackActions.pop(count));
	}
}
