import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View, TextStyle } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Container, RouteCard, BottomSheet, Shimmer, Text } from '@components';
import { Variables, Images, Fonts, Colors } from '@constant';
import { NavigationProps, DeliveryInterface } from '@interfaces';
import ReportIssue from './ReportIssue';
import { NavigationHelper, useAppDispatch, useAppSelector, Ratio } from '@helpers';
import { Actions } from '@store';

const DeliveryRoute = ({ route }: NavigationProps<'DeliveryRoute'>) => {

	const [showReportIssue, setShowReportIssue] = useState<string | null>(null);
	const [showCart, setShowCart] = useState<boolean>(false);
	const [showListSo, setShowListSo] = useState<boolean>(false);
	const [reportKey, setReportKey] = useState(0);
	const [reportValues, setReportValues] = useState<DeliveryInterface.IComplain>();

	const loading = useAppSelector(state => state.deliveryReducers.loadingDeliveryProcess);
	const loadingStartClient = useAppSelector(state => state.deliveryReducers.loadingStartDeliveryClient);
	const listClient = useAppSelector(state => state.deliveryReducers.clientValidation);

	const clients = useMemo(() => listClient.filter((c) => c.deliveryId == route.params?.deliveryId), [listClient, loadingStartClient]);

	const getClient = useAppDispatch(Actions.deliveryAction.getDeliveryProcess);
	const startDeliveryClient = useAppDispatch(Actions.deliveryAction.startDeliveryClient);
	const arrivedDeliveryClient = useAppDispatch(Actions.deliveryAction.justArrived);
	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);
	const getOdometer = useAppDispatch(Actions.miscAction.getStartOdometer);

	const [listCart, setListCart] = useState<DeliveryInterface.IDeliveryCart[]>([]);
	const [listSo, setListSo] = useState<string[]>([]);

	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			//auto reload using focus listener as trigger
			getClient(route.params?.deliveryId);

			if (reportKey) {
				setReportKey(0);
				// setShowReportIssue(true);
			}
		}
	}, [isFocused]);

	useEffect(() => {
		return () => setTmpImgUri('');
	}, []);

	const warehouseDataAdded = useMemo(() => {
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
		return addWareHouseOnLastData;
	}, [loadingStartClient, listClient]);

	const notReadyToFinish = (dataClient: DeliveryInterface.IDeliveryCustomer[]): boolean => {
		const result = dataClient.some(route => (route.status != 1 && route.status != 7));
		return result;
	};

	return (
		<Container
			noPadding noScroll
			header={ {
				title: 'Rute Pengiriman',
				type: 'regular',
			} }
		>
			{ !loading &&
				<FlatList
					keyExtractor={ (item) => item.id }
					extraData={ loadingStartClient }
					data={ warehouseDataAdded }
					renderItem={ ({ item, index }) => {

						return (
							<RouteCard
								client={ item }
								isLastRoute={ index == warehouseDataAdded.length - 1 }
								onClick={ () => item.status == Variables.DELIVERY_STATUS.ARRIVED ? NavigationHelper.push('DeliveryArrival', { deliveryId: route.params?.deliveryId, clientId: item.id }) : null }
								// onClick={ () => item.status == Variables.DELIVERY_STATUS.ARRIVED ? NavigationHelper.push('DeliveryCheck', { deliveryId: route.params?.deliveryId, clientId: item.id }) : null }
								disabled={ index == warehouseDataAdded.length - 1 ? notReadyToFinish(clients) : false }
								loading={ loadingStartClient }
								onStart={ () => startDeliveryClient(route.params?.deliveryId, item.id) }
								onArrived={ () => arrivedDeliveryClient(route.params?.deliveryId, item.id) }
								// onFinish={ () => NavigationHelper.push('InputKms', { deliveryId: item.deliveryId, deliveryLocation: item.address }) }
								onFinish={ () => getOdometer({ deliveryId: item.deliveryId, deliveryLocation: item.address }) }
								onRedirect={ () => NavigationHelper.push('DeliveryArrival', { deliveryId: item.deliveryId, clientId: item.id }) }
								// onRedirect={ () => NavigationHelper.push('DeliveryCheck', { deliveryId: item.deliveryId, clientId: item.id }) }
								onClickCart={ () => {
									setListCart(item.carts ?? []);
									setShowCart(true);
								} }
								onClickSo={ () => {
									setListSo(item.listSo ?? []);
									setShowListSo(true);
								} }
								onReportClick={ (clientId) => setShowReportIssue(clientId) }
							/>);
					}
					}
					refreshing={ loading ? true : false }
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
				visible={ showReportIssue ? true : false }
				onRequestClose={ () => {
					setTmpImgUri('');
					setShowReportIssue(null);
					setReportValues(undefined);
				} }
				noScroll
				key={ reportKey }
			>
				<ReportIssue
					deliveryId={ route.params?.deliveryId ?? '' }
					onClose={ () => {
						setTmpImgUri('');
						setShowReportIssue(null);
						setReportValues(undefined);
					} }
					clientId={ showReportIssue }
					onClickCamera={ (reportValues) => {
						// setShowReportIssue(false);
						setReportValues(reportValues);
						NavigationHelper.push('CapturePhoto');
						setReportKey(1);
					} }
					initValues={ reportValues }
				/>
			</BottomSheet>

			<BottomSheet
				visible={ showCart }
				onRequestClose={ () => setShowCart(false) }
				noScroll
			>
				<FlatList
					data={ listCart }
					keyExtractor={ item => item.id }
					renderItem={ ({ item: cart }) => (
						<View style={ {
							paddingHorizontal: 20,
							paddingVertical: 15,
						} }>
							<Text format={ Fonts.textBody.l.bold as TextStyle } >Kode Keranjang: { cart.id }</Text>
							<Text format={ Fonts.textBody.m.regular as TextStyle } style={ { marginTop: 5 } } >Jumlah: { cart.qty }</Text>
							<View style={ { height: 1, backgroundColor: Colors.gray.line, marginTop: 6 } } />
						</View>
					) }
					style={ { marginTop: 16 } }
				/>
			</BottomSheet>

			<BottomSheet
				visible={ showListSo }
				onRequestClose={ () => setShowListSo(false) }
				noScroll
			>
				<FlatList
					data={ listSo }
					keyExtractor={ (_item, index) => index.toString() }
					renderItem={ ({ item: so, index }) => (
						<View style={ {
							paddingHorizontal: 20,
							paddingVertical: 15,
						} }>
							<Text format={ Fonts.textBody.l.bold as TextStyle } >Sales Order { index + 1 }</Text>
							<Text format={ Fonts.textBody.m.bold as TextStyle } style={ { marginTop: 5 } } >{ so }</Text>
							<View style={ { height: 1, backgroundColor: Colors.gray.line, marginTop: 6 } } />
						</View>
					) }
					style={ { marginTop: 16 } }
				/>
			</BottomSheet>

		</Container>
	);
};

export default DeliveryRoute;