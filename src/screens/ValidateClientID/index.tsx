import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Container, BottomSheet, ModalDialog, Button } from '@components';
import { Colors, Images } from '@constant';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { DeliveryInterface, NavigationProps } from '@interfaces';
import { Actions } from '@store';

import ClientCard from './ClientCard';
import ScanChoice from './ScanChoice';
import ContentValidateDialog from './ContentValidateDialog';
import StartDeliveryWarning from './StartDeliveryWarning';

const ValidateClientID = ({ route }: NavigationProps<'ValidateClientID'>) => {
	const [showScanChoices, setShowScanChoices] = useState<boolean>(false);
	const [showResult, setShowResult] = useState<boolean>(false);
	const [selectedClient, setSelectedClient] = useState<DeliveryInterface.IDeliveryCustomer>();
	const [showWarningStartDelivery, setShowWarningStartDelivery] = useState<boolean>(false);

	const loading = useAppSelector(state => state.deliveryReducers.loadingClient);
	const deliveryList = useAppSelector(state => state.deliveryReducers.deliveryList);

	const client = useAppSelector(state => state.deliveryReducers.clientValidation);
	const clientList = useMemo(() =>
		(client.filter((value) => value.deliveryId == route.params?.deliveryId)),
		[client]
	);

	const getClient = useAppDispatch(Actions.deliveryAction.getDeliveryClient);

	const delivery = deliveryList.find((value) => value.id == route.params?.deliveryId);

	useEffect(() => {
		if (delivery) {
			// get client validation
			getClient(delivery.id);
		} else {
			// pop on delivery invalid
			Toast.show({
				type: 'error',
				text1: 'Terjadi Kesalahan',
				text2: 'Invalid delivery'
			});

			NavigationHelper.pop(1);
		}
	}, []);

	const handleOnChoosen = (value: string) => {
		if (value) {
			setShowResult(true);
			setShowScanChoices(false);
		}
	};

	const renderCustomers = useMemo(() => {
		if (clientList)
			return (
				<FlatList
					data={ clientList }
					showsVerticalScrollIndicator={ false }
					style={ styles.listStyle }
					contentContainerStyle={ styles.listContentStyle }
					keyExtractor={ (item: DeliveryInterface.IDeliveryCustomer) => item.id }
					renderItem={
						({ item: client }) => {
							return (<ClientCard
								customer={ client }
								deliveryId={ delivery?.id ?? '' }
								onOpenScanChoice={ () => {
									setShowScanChoices(true);
									setSelectedClient(client);
								} }
							/>);
						}
					}
					ItemSeparatorComponent={ () => (<View style={ { height: 16 } } />) }
					refreshing={ loading }
					onRefresh={ () => getClient(delivery?.id) }
				/>
			);
	}, [clientList, loading]);

	const renderButton = useMemo(() => (
		<Button
			weight='700'
			color={ Colors.white.pure }
			text='Mulai Pengiriman'
			onPress={ () => {
				// count validated items
				const numValidated = clientList.reduce((a, v) => a += (v.numValidated ?? 0), 0);

				// count all items
				const numItems = clientList.reduce((a, v) => a += (v.numItem ?? 0), 0);

				if (numItems > numValidated)
					setShowWarningStartDelivery(true);
				else
					NavigationHelper.push('InputKms');
			} }
			disabled={ clientList.some((client) => !client.validated) }
		/>
	), [clientList]);

	return (
		<Container
			noPadding
			noScroll
			header={ {
				title: 'Validasi Client ID',
				type: 'regular'
			} }
		>
			{ renderCustomers }

			<View style={ styles.footer }>
				<Images.ButtonCircleScan style={ { alignSelf: 'flex-end' } } />

				{ renderButton }
			</View>

			<BottomSheet
				visible={ showScanChoices }
				onRequestClose={ () => setShowScanChoices(false) }
			>

				<ScanChoice
					onChoosen={ handleOnChoosen }
					deliveryId={ delivery?.id ?? '' }
				/>
			</BottomSheet>

			<ModalDialog
				visible={ showResult }
				onRequestClose={ () => setShowResult(false) }
			>

				<ContentValidateDialog
					onCheckOther={ () => setShowResult(false) }
					client={ selectedClient }
					deliveryId={ delivery?.id }
				/>
			</ModalDialog>

			<ModalDialog visible={ showWarningStartDelivery }
				onRequestClose={ () => setShowWarningStartDelivery(false) }>
				<StartDeliveryWarning onCancel={ () => setShowWarningStartDelivery(false) }
					deliveryId={ route.params?.deliveryId }
				/>

			</ModalDialog>
		</Container>

	);
};

export default ValidateClientID;

const styles = StyleSheet.create({
	listStyle: { flexGrow: 1, flex: 1 },
	listContentStyle: { paddingVertical: 16 },
	footer: { bottom: 20 }
});