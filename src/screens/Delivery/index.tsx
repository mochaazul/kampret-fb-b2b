import React from 'react';
import { View, TouchableOpacity, TextStyle } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import { Container, Header, Text } from '@components';
import { Colors, Fonts } from '@constant';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from "@store";

import DeliveryList from './List';
import DeliveryHistory from './History';
import styles from './style';
import { NavigationProps } from '@interfaces';

const Tab = createMaterialTopTabNavigator();

type DeliveryProps = NavigationProps<'Delivery'>

const TabItem: React.FC<MaterialTopTabBarProps> = ({ state, navigation }) => (
	<View style={ { flexDirection: 'row', alignItems: 'center' } }>
		{ state.routes.map((route, index) => {
			const label = route.name;

			const isFocused = state.index === index;

			const onPress = () => {
				const event = navigation.emit({
					type: 'tabPress',
					target: route.key,
					canPreventDefault: true,
				});

				if (!isFocused && !event.defaultPrevented) {
					navigation.navigate(route.name);
				}
			};

			return (
				<TouchableOpacity key={ 'item_' + index }
					style={ [
						styles.tabItem,
						index > 0 ? styles.tabFirst : styles.tabNotFirst,
						isFocused ? styles.tabActive : styles.tabInactive
					] }
					activeOpacity={ .8 }
					onPress={ onPress }
				>

					<Text
						format={ Fonts.textBody.l.bold as TextStyle }
						color={ isFocused ? Colors.company.red : Colors.gray.default }>
						{ label }
					</Text>
				</TouchableOpacity>
			);
		}) }
	</View>
);


const Delivery = ({route}:DeliveryProps) => {
	const logout = useAppDispatch(Actions.authAction.logout);
	return (
		<Container
			noPadding
			noScroll
			header={ { type: 'main', onPressRightButton: () => logout() } }
			contentContainerStyle={ styles.container }
		>

			<Tab.Navigator
				tabBar={ props => <TabItem { ...props } /> }
			>
				<Tab.Screen name="Pengiriman" component={ DeliveryList } />
				<Tab.Screen name="Riwayat Pengiriman" component={ DeliveryHistory } />
			</Tab.Navigator>

		</Container>
	);
};

export default Delivery;
