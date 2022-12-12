import { FlatList } from 'react-native';
import React, { useEffect } from 'react';

import { Container, RouteCard } from '@components';
import { Images } from '@constant';
import { ComponentInterface, NavigationProps } from '@interfaces';
import { NavigationHelper } from '@helpers';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

const DeliveryRouteHistory = ({ route }: NavigationProps<'DeliveryRouteHistory'>) => {
	const deliveryHistoryRoute = useAppSelector(state => state.deliveryReducers.deliveryHistoryRoute);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryHistoryRoute);

	useEffect(() => { fetchList(route.params.deliveryId); }, []);

	const dummyData: ComponentInterface.IRoute[] = [
		{
			numbering: 1,
			locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
			locationTime: { startAt: '07:00', estEnd: '12:00' },
			locationTitle: 'Sumorice',
			totalItem: 5,
			isDelivered: { complain: 2, receivedCount: 5, totalDeliveredItem: 4 },
			onClick: () => NavigationHelper.push('DeliveryHistoryDetail')
		},
		{
			numbering: 2,
			locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
			locationTime: { startAt: '07:00', estEnd: '12:00' },
			locationTitle: 'Sumorice',
			totalItem: 5,
			isDelivered: { complain: 2, receivedCount: 5, totalDeliveredItem: 4 },
			onClick: () => NavigationHelper.push('DeliveryHistoryDetail')
		},
		{
			numbering: 3,
			locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
			locationTime: { startAt: '07:00', estEnd: '12:00' },
			locationTitle: 'Sumorice',
			totalItem: 5,
			isDelivered: { complain: 2, receivedCount: 5, totalDeliveredItem: 4 },
			onClick: () => NavigationHelper.push('DeliveryHistoryDetail')
		},
		{
			numbering: 4,
			locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
			locationTime: { startAt: '07:00', estEnd: '12:00' },
			locationTitle: 'Sumorice',
			totalItem: 5,
			isDelivered: { complain: 2, receivedCount: 5, totalDeliveredItem: 4 },
			isLastRoute: true,
			onClick: () => NavigationHelper.push('DeliveryHistoryDetail')
		}
	];

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