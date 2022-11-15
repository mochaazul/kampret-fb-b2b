import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { Container, BottomSheet, ModalDialog, Button } from '@components';
import { Colors, Images } from '@constant';
import { NavigationHelper } from '@helpers';
import ClientCard from './ClientCard';
import ScanChoice from './ScanChoice';
import ContentValidateDialog from './ContentValidateDialog';
import StartDeliveryWarning from './StartDeliveryWarning';
import { DeliveryInterface } from '@interfaces';

const ValidateClientID = (props: any) => {
	const [showScanChoices, setShowScanChoices] = useState<boolean>(false);
	const [showResult, setShowResult] = useState<boolean>(false);
	const [showWarningStartDelivery, setShowWarningStartDelivery] = useState<boolean>(false);
	const delivery = props.route.params as DeliveryInterface.IDelivery;

	const handleOnChoosen = (value: string) => {
		if (value == 'result') {
			setShowResult(true);
		}
		setShowScanChoices(false);
	};

	return (
		<Container
			noPadding
			noScroll
			header={ {
				title: 'Validasi Client ID',
				type: 'regular'
			} }
		>
			{
				delivery.customers &&
				<FlatList
					data={ delivery.customers }
					showsVerticalScrollIndicator={ false }
					style={ { flexGrow: 1, flex: 1 } }
					renderItem={
						({ item, index }) =>
							<ClientCard
								customer={ item }
								onOpenScanChoice={ () => setShowScanChoices(true) }
							/>
					}
				/>
			}

			<View style={ styles.footer }>
				<Images.ButtonCircleScan style={ { alignSelf: 'flex-end' } } />

				<Button
					weight='700'
					color={ Colors.white.pure }
					text='Mulai Pengiriman'
					onPress={ () => setShowWarningStartDelivery(true) }
				/>
			</View>

			<BottomSheet
				visible={ showScanChoices }
				onRequestClose={ () => setShowScanChoices(false) }
			>
				<ScanChoice onChoosen={ value => handleOnChoosen(value) } />
			</BottomSheet>

			<ModalDialog visible={ showResult }
				onRequestClose={ () => setShowResult(false) }>
				<ContentValidateDialog />
			</ModalDialog>

			<ModalDialog visible={ showWarningStartDelivery }
				onRequestClose={ () => setShowWarningStartDelivery(false) }>
				<StartDeliveryWarning onCancel={ () => setShowWarningStartDelivery(false) } />

			</ModalDialog>
		</Container>

	);
};

export default ValidateClientID;

const styles = StyleSheet.create({
	footer: {
		bottom: 20
	}
});