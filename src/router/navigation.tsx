import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationHelper, useLinking } from '@helpers';
import { screens, modals } from './screens';

const Stack = createNativeStackNavigator();

const AppRouter = () => {

	const { openedEvent: _ } = useLinking();

	return (
		<NavigationContainer
			ref={ NavigationHelper.navigationRef }
		>
			<Stack.Navigator
				initialRouteName='Splash'
				screenOptions={ { headerShown: false } }>
				{
					screens
						// .filter(({ name }) => name != 'ScanBarcode')
						.map(({ name, component }, index) => {
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
