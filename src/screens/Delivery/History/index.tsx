import { FlatList, View } from 'react-native';
import React, { useEffect } from 'react';

import styles from './style';
import { dummyDeliveryHistory } from '../dummy';
import DeliveryHistoryItem from './DeliveryHistoryItem';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

const DeliveryHistory = () => {

	const deliveryHistory = useAppSelector(state => state.deliveryReducers.deliveryHistory);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryHistory);

	useEffect(() => { fetchList(); }, []);

	return (
		<FlatList
			bounces={ false }
			keyExtractor={ (_item, index) => 'tabBar_' + index }
			style={ styles.container }
			contentContainerStyle={ styles.content }
			showsVerticalScrollIndicator={ false }
			data={ deliveryHistory }
			renderItem={
				({ item, index }) => <DeliveryHistoryItem key={ 'item_' + index } { ...item } />
			}
			ItemSeparatorComponent={
				() => (<View style={ { height: 16 } } />)
			}
		/>
	);
};

export default DeliveryHistory;
