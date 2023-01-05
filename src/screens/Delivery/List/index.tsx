import { FlatList, TextStyle, View } from 'react-native';
import React, { useEffect } from 'react';

import styles from './style';
import DeliveryItem from './DeliveryItem';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { Colors, Fonts, Images } from '@constant';
import { Text } from '@components';

const DeliveryList = () => {

	const deliveryList = useAppSelector(state => state.deliveryReducers.deliveryList);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryList);

	useEffect(() => { fetchList(); }, []);

	// show empty state when not loading and delivery list is empty
	if (!loading && deliveryList.length == 0)
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
					Belum ada pengiriman baru untuk saat ini.
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
			onRefresh={ fetchList }
			refreshing={ loading }
			data={ deliveryList }
			renderItem={
				({ item, index }) => {

					// hide delivery task when delivery is finished
					if (item.deliveryTextStatus != 'FINISH') {
						return (
							<DeliveryItem key={ 'item_' + index } { ...item } />
						);
					} else {
						return (<View />);
					}

				}
			}
			ItemSeparatorComponent={
				() => (<View style={ styles.heightSpace } />)
			}
		/>
	);
};

export default DeliveryList;
