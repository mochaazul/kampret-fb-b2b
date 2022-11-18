import { FlatList, View } from 'react-native';
import React from 'react';

import styles from './style';
import { dummyDeliveryHistory } from '../dummy';
import DeliveryHistoryItem from './DeliveryHistoryItem';

const DeliveryHistory = () => (
	<FlatList
		bounces={ false }
		keyExtractor={ (_item, index) => 'tabBar_' + index }
		style={ styles.container }
		contentContainerStyle={ styles.content }
		showsVerticalScrollIndicator={ false }
		data={ dummyDeliveryHistory }
		renderItem={
			({ item, index }) => <DeliveryHistoryItem key={ 'item_' + index } { ...item } />
		}
		ItemSeparatorComponent={
			() => (<View style={ { height: 16 } } />)
		}
	/>
);

export default DeliveryHistory;
