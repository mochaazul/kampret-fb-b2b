import { FlatList, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

import { Container, RouteCard, BottomSheet, Shimmer } from '@components';
import { Variables, Images } from '@constant';
import { NavigationProps, DeliveryInterface } from '@interfaces';
import ReportIssue from './ReportIssue';
import { NavigationHelper, useAppDispatch, useAppSelector, Ratio } from '@helpers';
import { Actions } from '@store';

const DeliveryRoute = ({ route, navigation }: NavigationProps<'DeliveryRoute'>) => {

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
		//auto reload using focus listener as trigger
		const setFocusListener = navigation.addListener('focus', () => {
			getClient(route.params?.deliveryId);
		});

		return () => {
			setFocusListener();
		};
	}, []);

	let addWareHouseOnLastData: DeliveryInterface.IDeliveryCustomer[] = [];

	if (clients.length !== 0) {
		addWareHouseOnLastData = [...clients, {
			id: '0000',
			deliveryId: clients[0].deliveryId,
			custName: 'Warehouse Freshbox',
			validated: true,
			address: 'FreshBox HQ',
			deliveryTime: undefined,
			sequence: clients.length + 1
		}];
	}

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
			{ !loading &&
				<FlatList
					keyExtractor={ (_item, index) => 'route_' + index }
					extraData={ [loadingStartClient, listClient] }
					data={ addWareHouseOnLastData }
					renderItem={ ({ item, index }) =>
						<RouteCard
							client={ item }
							isLastRoute={ index == addWareHouseOnLastData.length - 1 }
							onClick={ () => item.status == Variables.DELIVERY_STATUS.ARRIVED ? NavigationHelper.push('DeliveryCheck', { deliveryId: route.params?.deliveryId, clientId: item.id }) : null }
							disabled={ index == addWareHouseOnLastData.length - 1 ? clients.some(route => route.status !== 1) : false }
							loading={ loadingStartClient }
							onStart={ () => startDeliveryClient(route.params?.deliveryId, item.id) }
							onArrived={ () => arrivedDeliveryClient(route.params?.deliveryId, item.id) }
							onFinish={ () => NavigationHelper.push('InputKms', { deliveryId: item.deliveryId, deliveryLocation: item.address }) }
							onRedirect={ () => NavigationHelper.push('DeliveryCheck', { deliveryId: item.deliveryId, clientId: item.id }) }
						/>
					}
					refreshing={ loading }
					onRefresh={ () => getClient(route.params?.deliveryId) }
				/>
			}
			{ loading && //showing shimmer loading skeleton, animated when get data from API
				<FlatList
					keyExtractor={ (item, index) => index + '' }
					data={ Array(6).fill(0) }
					showsVerticalScrollIndicator={ false }
					renderItem={ ({ index }) => (
						<View key={ index } style={ {
							alignSelf: 'center',
							marginVertical: 12
						} }>
							<Shimmer animate={ true } active width={ Ratio.screenWidth - 48 } height={ 120 } />
						</View>
					) }
				/>
			}
			<BottomSheet
				visible={ showReportIssue }
				onRequestClose={ () => setShowReportIssue(false) }
				noScroll
			>
				<ReportIssue
					deliveryId={ route.params?.deliveryId ?? '' }
					onClose={ () => setShowReportIssue(false) }

				/>
			</BottomSheet>


		</Container>
	);
};

export default DeliveryRoute;