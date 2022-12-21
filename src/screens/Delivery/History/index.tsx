import { FlatList, TextStyle, View } from 'react-native';
import React, { useEffect } from 'react';

import styles from './style';
import DeliveryHistoryItem from './DeliveryHistoryItem';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { Text } from '@components';
import { Colors, Fonts, Images } from '@constant';

const DeliveryHistory = () => {

	const deliveryHistory = useAppSelector(state => state.deliveryReducers.deliveryHistory);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryHistory);

	useEffect(() => { fetchList(); }, []);

	// show empty state when not loading and delivery list is empty
	if (!loading && deliveryHistory?.length == 0)
		return (
			<View style={ styles.emptyContainer }>
				<Images.EmptyBox
					height={ 60 }
				/>

				<Text
					format={ Fonts.paragraph.xl.bold as TextStyle }
					color={ Colors.black.default }
					style={ styles.emptyLabel }
					mt={ 36 }
				>
					Belum ada riwayat pengiriman untuk saat ini.
				</Text>
			</View >
		);

	return (
		<FlatList
			bounces={ false }
			keyExtractor={ (_item, index) => 'tabBar_' + index }
			style={ styles.container }
			contentContainerStyle={ styles.content }
			showsVerticalScrollIndicator={ false }
			data={ deliveryHistory }
			onRefresh={ fetchList }
			refreshing={ loading }
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
