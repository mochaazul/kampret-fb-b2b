/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { NavigationHelper, Ratio, useAppDispatch, useAppSelector } from '@helpers';
import { Images } from '@constant';
import styles from './style';
import { Actions } from '@store';
function Splash() {

	const setDeviceHeight = useAppDispatch(Actions.miscAction.setDeviceHeight);
	const userReducer = useAppSelector(state => state.authReducers.user);

	useEffect(() => {

		setDeviceHeight(Ratio.getDeviceHeight());

		// save timeoutId to clear the timeout when the component re-renders
		const tm = setTimeout(() => {
			if (userReducer) {
				NavigationHelper.reset('Delivery');
			} else {
				NavigationHelper.reset('Login');
			}

		}, 1500);

		// clear timeout on re-render to avoid memory leaks
		return () => {
			clearTimeout(tm);
		};
	}, []);

	return (
		<View style={ styles.container }>
			<Images.LogoFB />
		</View>
	);
}

export default Splash;
