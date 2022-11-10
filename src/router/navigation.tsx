import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationHelper } from '@helpers';
import { screens } from './screens';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
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
