import { FlatList } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

import { Container, RouteCard, BottomSheet } from '@components';
import { Dispatches, Images } from '@constant';
import { ComponentInterface, NavigationProps } from '@interfaces';
import Complain from './Complain';
import ReportIssue from './ReportIssue';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

const dummyData: ComponentInterface.IRoute[] = [{
	numbering: 1,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
	isDelivered: { complain: 2, receivedCount: 5, totalDeliveredItem: 4 }
},
{
	numbering: 2,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
},
{
	numbering: 3,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
	disabled: true
},
{
	numbering: 4,
	locationAddress: 'Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
	locationTime: { startAt: '07:00', estEnd: '12:00' },
	locationTitle: 'Sumorice',
	totalItem: 5,
	disabled: true,
	isLastRoute: true
}
];
const DeliveryRoute = ({ route }: NavigationProps<'DeliveryRoute'>) => {

	const [showComplain, setShowComplain] = useState<boolean>(false);
	const [showReportIssue, setShowReportIssue] = useState<boolean>(false);

	const loading = useAppSelector(state => state.deliveryReducers.loadingDeliveryProcess);
	const loadingStartClient = useAppSelector(state => state.deliveryReducers.loadingStartDeliveryClient);
	const listClient = useAppSelector(state => state.deliveryReducers.clientValidation);
	const clients = useMemo(() => listClient.filter((c) => c.deliveryId == route.params?.deliveryId), [listClient]);

	const getClient = useAppDispatch(Actions.deliveryAction.getDeliveryProcess);
	const startDeliveryClient = useAppDispatch(Actions.deliveryAction.startDeliveryClient);

	useEffect(() => {
		getClient(route.params?.deliveryId);
	}, []);

	const renderList = useMemo(() => (
		<FlatList
			keyExtractor={ (_item, index) => 'route_' + index }
			data={ clients }
			renderItem={ ({ item, index }) =>
				<RouteCard
					client={ item }
					isLastRoute={ index == clients.length - 1 }
					onClick={ () => { } }
					disabled={ false }
					loading={ loadingStartClient }
					onStart={ () => startDeliveryClient(route.params?.deliveryId, item.id) }
				/>
			}
			refreshing={ loading == true }
			onRefresh={ () => getClient(route.params?.deliveryId) }
		/>
	), [clients, loading]);

	return (
		<Container
			noPadding noScroll
			header={ {
				title: 'Rute Pengiriman',
				type: 'regular',
				rightButton: (<Images.IconAlert />),
				onPressRightButton: () => setShowReportIssue(true)
			} }
		>

			{ renderList }

			<BottomSheet
				visible={ showComplain }
				onRequestClose={ () => setShowComplain(false) }
				noScroll
			>
				<Complain onClose={ () => setShowComplain(false) } />
			</BottomSheet>

			<BottomSheet
				visible={ showReportIssue }
				onRequestClose={ () => setShowReportIssue(false) }
				noScroll
			>
				<ReportIssue onClose={ () => setShowReportIssue(false) } />
			</BottomSheet>

		</Container>
	);
};

export default DeliveryRoute;