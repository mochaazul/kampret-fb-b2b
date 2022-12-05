import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationHelper, useLinking } from '@helpers';
import { ScreenNameType, screens } from './screens';
import { Camera } from 'react-native-vision-camera';

const Stack = createNativeStackNavigator();

const AppRouter = () => {

	const {openedEvent:_} = useLinking()
	useEffect(() => {
		requestCamera();
	}, []);

	const requestCamera = async () => {
		await Camera.requestCameraPermission();
		await Camera.requestMicrophonePermission();
	};
	return (
		<NavigationContainer 
			ref={ NavigationHelper.navigationRef }
		>
			<Stack.Navigator
				initialRouteName='Splash'
				screenOptions={ { headerShown: false } }>
				{
					screens.map(({name, component}, index) => {
						return (
							<Stack.Screen
								key={ index }
								name={ name}
								component={ component } />
						);
					})
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppRouter;
