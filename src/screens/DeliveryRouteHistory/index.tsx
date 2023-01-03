import { FlatList } from 'react-native';
import React, { useEffect } from 'react';

import { Container, RouteCard } from '@components';
import { Images, Variables } from '@constant';
import { NavigationProps } from '@interfaces';
import { useAppDispatch, useAppSelector, NavigationHelper } from '@helpers';
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
				renderItem={ ({ item, index }) =>
					<RouteCard
						client={ item }
						isLastRoute={ deliveryHistoryRoute ? index == deliveryHistoryRoute.length - 1 : true }
						onClick={ () => item.status == Variables.DELIVERY_STATUS.ARRIVED ? NavigationHelper.push('DeliveryCheck', { deliveryId: route.params?.deliveryId, clientId: item.id }) : null }
						disabled={ false }
						loading={ false }
					// onStart={ () => startDeliveryClient(route.params?.deliveryId, item.id) }
					// onArrived={ () => arrivedDeliveryClient(route.params?.deliveryId, item.id) }
					// onFinish={ () => NavigationHelper.push('InputKms', { deliveryId: item.deliveryId, deliveryLocation: item.address }) }
					/>
				}
				onRefresh={ fetchList }
				refreshing={ loading }
			/>
		</Container>
	);
};

export default DeliveryRouteHistory;