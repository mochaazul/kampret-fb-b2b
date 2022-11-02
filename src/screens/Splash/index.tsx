/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { NavigationHelper, Ratio, useAppDispatch } from '@helpers';
import { Images } from '@constant';
import styles from './style';
import { Actions } from '@store';
function Splash() {

	const setDeviceHeight = useAppDispatch(Actions.miscAction.setDeviceHeight);

	useEffect(() => {

		setDeviceHeight(Ratio.getDeviceHeight());

		// save timeoutId to clear the timeout when the component re-renders
		const tm = setTimeout(() => {
			NavigationHelper.reset('Login');
		}, 3000);

		// clear timeout on re-render to avoid memory leaks
		return () => {
			clearTimeout(tm);
		};
	}, []);

	return (
		<View style={ styles.container }>
			<Images.LogoWhite />
		</View>
	);
}

export default Splash;
