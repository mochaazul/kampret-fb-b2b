import { FlatList, View } from 'react-native';
import React from 'react';

import styles from './style';
import { dummyDelivery } from '../dummy';
import DeliveryItem from './DeliveryItem';

const DeliveryList = () => (
	<FlatList
		bounces={ false }
		keyExtractor={ (_item, index) => 'tabBar_' + index }
		style={ styles.container }
		contentContainerStyle={ styles.content }
		showsVerticalScrollIndicator={ false }
		data={ dummyDelivery }
		renderItem={
			({ item, index }) => <DeliveryItem key={ 'item_' + index } { ...item } />
		}
		ItemSeparatorComponent={
			() => (<View style={ styles.heightSpace } />)
		}
	/>
);

export default DeliveryList;
