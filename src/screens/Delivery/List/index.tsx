import { FlatList, View } from 'react-native';
import React, { useEffect } from 'react';

import styles from './style';
import DeliveryItem from './DeliveryItem';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

const DeliveryList = () => {

	const deliveryList = useAppSelector(state => state.deliveryReducers.deliveryList);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryList);

	useEffect(() => { fetchList(); }, []);

	return (
		<FlatList
			bounces={ false }
			keyExtractor={ (_item, index) => 'tabBar_' + index }
			style={ styles.container }
			contentContainerStyle={ styles.content }
			showsVerticalScrollIndicator={ false }
			onRefresh={ fetchList }
			refreshing={ loading }
			data={ deliveryList }
			renderItem={
				({ item, index }) => <DeliveryItem key={ 'item_' + index } { ...item } />
			}
			ItemSeparatorComponent={
				() => (<View style={ styles.heightSpace } />)
			}
		/>
	);
};

export default DeliveryList;
