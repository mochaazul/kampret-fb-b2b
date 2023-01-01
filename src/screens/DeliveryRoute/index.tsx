import { FlatList } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

import { Container, RouteCard, BottomSheet } from '@components';
import { Variables, Images } from '@constant';
import { ComponentInterface, NavigationProps } from '@interfaces';
import Complain from './Complain';
import ReportIssue from './ReportIssue';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

const DeliveryRoute = ({ route }: NavigationProps<'DeliveryRoute'>) => {

	//const [showComplain, setShowComplain] = useState<boolean>(false);
	const [showReportIssue, setShowReportIssue] = useState<boolean>(false);

	const loading = useAppSelector(state => state.deliveryReducers.loadingDeliveryProcess);
	const loadingStartClient = useAppSelector(state => state.deliveryReducers.loadingStartDeliveryClient);
	const listClient = useAppSelector(state => state.deliveryReducers.clientValidation);
	const clients = useMemo(() => listClient.filter((c) => c.deliveryId == route.params?.deliveryId), [listClient]);

	const getClient = useAppDispatch(Actions.deliveryAction.getDeliveryProcess);
	const startDeliveryClient = useAppDispatch(Actions.deliveryAction.startDeliveryClient);
	const arrivedDeliveryClient = useAppDispatch(Actions.deliveryAction.justArrived);
	useEffect(() => {
		getClient(route.params?.deliveryId);
	}, []);
	console.log('loading start client', loadingStartClient);
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
			<FlatList
				keyExtractor={ (_item, index) => 'route_' + index }
				extraData={ loadingStartClient }
				data={ clients }
				renderItem={ ({ item, index }) =>
					<RouteCard
						client={ item }
						isLastRoute={ index == clients.length - 1 }
						onClick={ () => item.status == Variables.DELIVERY_STATUS.ARRIVED ? NavigationHelper.push('DeliveryCheck', { deliveryId: route.params?.deliveryId, clientId: item.id }) : null }
						disabled={ false }
						loading={ loadingStartClient }
						onStart={ () => startDeliveryClient(route.params?.deliveryId, item.id) }
						onArrived={ () => arrivedDeliveryClient(route.params?.deliveryId, item.id) }
						onFinish={ () => NavigationHelper.push('InputKms', { deliveryId: item.deliveryId, deliveryLocation: item.address }) }
					/>
				}
				refreshing={ loading == true }
				onRefresh={ () => getClient(route.params?.deliveryId) }
			/>

			{/* <BottomSheet
				visible={ showComplain }
				onRequestClose={ () => setShowComplain(false) }
				noScroll
			>
				<Complain onClose={ () => setShowComplain(false) } />
			</BottomSheet> */}

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