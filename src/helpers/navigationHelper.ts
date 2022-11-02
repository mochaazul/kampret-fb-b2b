
import { createNavigationContainerRef, StackActions, CommonActions } from '@react-navigation/native';

import { screens } from '../router/screens';

export const navigationRef = createNavigationContainerRef();

export function push(name: typeof screens[number]['name'], params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(StackActions.push(name, params));
	}
}

export function replace(name: typeof screens[number]['name'], params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(StackActions.replace(name, params));
	}
}

export function reset(name: typeof screens[number]['name'], params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(CommonActions.reset({
			index: 0,
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
