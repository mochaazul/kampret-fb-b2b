import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { Container, RouteCard } from '@components';
import { Colors, Images } from '@constant';
import { NavigationHelper } from '@helpers';
import { ComponentInterface } from '@interfaces';

const dummyData: ComponentInterface.IRoute[] = [{
	numbering: 1,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
	isDelivered: { complain: 2, receivedCount: 5, totalDeliveredItem: 4 }
},
{
	numbering: 2,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
},
{
	numbering: 3,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
	disabled: true
},
{
	numbering: 4,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
	disabled: true,
	isLastRoute: true
}
];
const DeliveryRoute = () => {

	const handleHeaderRightOnPress = () => {
		console.log('header right button pressed');
	};

	return (
		<Container
			noPadding noScroll
			header={ {
				title: 'Rute Pengiriman',
				type: 'regular',
				rightButton: (<Images.IconAlert />),
				onPressRightButton: () => handleHeaderRightOnPress()
			} }
		>
			<FlatList
				keyExtractor={ (item, index) => 'route_' + index }
				data={ dummyData }
				renderItem={ ({ item, index }) => <RouteCard { ...item } /> }
			/>
		</Container>

	);
};

export default DeliveryRoute;

const styles = StyleSheet.create({});