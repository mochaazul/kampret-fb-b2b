import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationHelper } from '@helpers';
import { screens } from './screens';
import { Camera } from 'react-native-vision-camera';

const Stack = createNativeStackNavigator();

const AppRouter = () => {

  useEffect(() => {
		requestCamera()
  }, []);

	const requestCamera = async () => {
		await Camera.requestCameraPermission()
		await Camera.requestMicrophonePermission()
	}
	return (
		<NavigationContainer ref={ NavigationHelper.navigationRef }>
			<Stack.Navigator
				initialRouteName='Splash'
				screenOptions={ { headerShown: false } }>
				{
					screens.map((screen, index) => {
						return (
							<Stack.Screen
								key={ index }
								name={ screen.name }
								component={ screen.component } />
						);
					})
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppRouter;
