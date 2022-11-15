import { FlatList, View } from 'react-native';
import React from 'react';

import { DeliveryItem } from '@components';
import styles from './style';
import { DeliveryInterface } from '@interfaces';

const items: Array<DeliveryInterface.IDeliveryItem> = [
	{
		id: 'SO0001-01',
		name: '5 Pack Rumput Laut',
		validated: false,
	},
	{
		id: 'SO0001-02',
		name: '5 Pack Daging Sapi',
		validated: false,
	},
	{
		id: 'SO0001-03',
		name: '5 Pack Daging Ikan',
		validated: false,
	},
	{
		id: 'SO0002-04',
		name: '5 Pack Daging Ikan',
		validated: false,
	},
	{
		id: 'SO0002-05',
		name: '5 Pack Daging Kambing',
		validated: false,
	},
];

const customers: Array<DeliveryInterface.IDeliveryCustomer> = [
	{
		id: 'CID1234567890',
		custName: 'Sumorice',
		validated: true,
		numCart: 1,
		items: items,
	},
	{
		id: 'CID1234567891',
		custName: 'Sumorice',
		validated: false,
		numCart: 2,
		items: items,
	},
	{
		id: 'CID1234567892',
		custName: 'Mangkokku',
		validated: false,
		numCart: 1,
		items: items,
	},
];

const dummyDelivery: Array<DeliveryInterface.IDelivery> = [
	{
		id: 'DT123456',
		numLocation: 4,
		date: '29-09-2022, 07:00 - 12:00 WIB',
		status: 'new',
		customers: customers,
		totalItem: 15
	},
	{
		id: 'DT123457',
		numLocation: 4,
		date: '29-09-2022, 07:00 - 12:00 WIB',
		status: 'deliver',
		customers: customers,
		totalItem: 20
	},
];

const DeliveryList = () => (
	<FlatList
		bounces={ false }
		keyExtractor={ (item, index) => 'tabBar_' + index }
		style={ styles.container }
		contentContainerStyle={ styles.content }
		showsVerticalScrollIndicator={ false }
		data={ dummyDelivery }
		renderItem={ ({ item, index }) => <DeliveryItem { ...item } /> }
		ItemSeparatorComponent={ () => (<View style={ { height: 16 } } />) }
	/>
);

export default DeliveryList;
