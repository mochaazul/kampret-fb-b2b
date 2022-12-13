import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import { Camera } from 'react-native-vision-camera';

import { NavigationHelper, useLinking } from '@helpers';
import { ScreenNameType, screens } from './screens';


const Stack = createNativeStackNavigator();

const AppRouter = () => {

	const { openedEvent: _ } = useLinking();
	useEffect(() => {
		requestLocationPermission();
	}, []);

	const requestLocationPermission = async () => {
		if (Platform.OS === 'ios') {

		} else {
			try {
				const granted = await PermissionsAndroid.requestMultiple([
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
					PermissionsAndroid.PERMISSIONS.CAMERA,
					//PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					//PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
				]);
				console.log('loc permission', granted);
			} catch (err) {
				console.warn(err);
			}
		}
	};

	return (
		<NavigationContainer
			ref={ NavigationHelper.navigationRef }
		>
			<Stack.Navigator
				initialRouteName='Splash'
				screenOptions={ { headerShown: false } }>
				{
					screens.map(({ name, component }, index) => {
						return (
							<Stack.Screen
								key={ index }
								name={ name }
								component={ component } />
						);
					})
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppRouter;
