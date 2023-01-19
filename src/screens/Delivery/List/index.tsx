import { FlatList, TextStyle, View } from 'react-native';
import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';

import styles from './style';
import DeliveryItem from './DeliveryItem';
import { Ratio, useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { Colors, Fonts, Images } from '@constant';
import { Shimmer, Text } from '@components';

const DeliveryList = () => {

	const deliveryList = useAppSelector(state => state.deliveryReducers.deliveryList);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryList);
	const pushXplayer = useAppDispatch(Actions.authAction.registerPushNotif);

	useEffect(() => {
		fetchList();
		innitiatePushNotif();
	}, []);

	const innitiatePushNotif = async () => {
		OneSignal.addSubscriptionObserver(async event => {
			if (event.to.isSubscribed) {
				const deviceState = await OneSignal.getDeviceState();
				// dispatch(authAction.setDeviceID(deviceState.userId));
				if (deviceState) pushXplayer(deviceState.userId);
			}
		});
		const existingDeviceState = await OneSignal.getDeviceState();
		if (existingDeviceState) pushXplayer(existingDeviceState.userId);
	};

	// show loading state
	if (loading)
		return (
			<FlatList
				keyExtractor={ (_item, index) => index + '' }
				data={ Array(4).fill(0) }
				showsVerticalScrollIndicator={ false }
				renderItem={ ({ index }) => (
					<View key={ index } style={ { alignSelf: 'center' } }>
						<Shimmer animate={ true } active width={ Ratio.screenWidth - 48 } height={ 180 } />
					</View>
				) }
				ItemSeparatorComponent={ () => (<View style={ styles.heightSpace } />) }
				ListHeaderComponent={ () => <View style={ styles.heightSpace } /> }
			/>
		);

	// show empty state when not loading and delivery list is empty
	if (!loading && deliveryList.filter((item) => item.deliveryTextStatus != 'FINISH').length == 0)
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
			keyExtractor={ (item) => item.id }
			style={ styles.container }
			contentContainerStyle={ styles.content }
			showsVerticalScrollIndicator={ false }
			onRefresh={ fetchList }
			refreshing={ loading }
			data={ deliveryList.filter((item) => item.deliveryTextStatus != 'FINISH') }
			renderItem={
				({ item, index }) => (<DeliveryItem key={ 'item_' + index } { ...item } />)
			}
			ItemSeparatorComponent={
				() => (<View style={ styles.heightSpace } />)
			}
		/>
	);
};

export default DeliveryList;
