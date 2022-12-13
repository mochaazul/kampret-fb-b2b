import { FlatList } from 'react-native';
import React, { useEffect } from 'react';

import { Container, RouteCard } from '@components';
import { Images } from '@constant';
import { NavigationProps } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

const DeliveryRouteHistory = ({ route }: NavigationProps<'DeliveryRouteHistory'>) => {
	const deliveryHistoryRoute = useAppSelector(state => state.deliveryReducers.deliveryHistoryRoute);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryHistoryRoute);

	useEffect(() => { fetchList(route.params.deliveryId); }, []);

	return (
		<Container
			noPadding
			noScroll
			header={ {
				title: 'Riwayat Rute Pengiriman',
				type: 'regular',
				rightButton: (<Images.IconAlert />),
				onPressRightButton: () => console.log(),
			} }
		>
			<FlatList
				keyExtractor={ (_item, index) => 'route_' + index }
				data={ deliveryHistoryRoute }
				renderItem={ ({ item }) => <RouteCard { ...item } deliveryId={ route.params.deliveryId } /> }
				onRefresh={ fetchList }
				refreshing={ loading }
			/>
		</Container>
	);
};

export default DeliveryRouteHistory;