import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { Container, BottomSheet, ModalDialog, Button } from '@components';
import { Colors, Images } from '@constant';
import ClientCard from './ClientCard';
import ScanChoice from './ScanChoice';
import ContentValidateDialog from './ContentValidateDialog';
import { NavigationHelper } from '@helpers';

const ValidateClientID = () => {
	const [showScanChoices, setShowScanChoices] = useState<boolean>(false);
	const [showResult, setShowResult] = useState<boolean>(false);
	const [testBarcodeValue, setTestBardcodeValue] = useState('')
	const handleOnChoosen = (value: string) => {
		if (value) {
			setShowResult(true);
			setTestBardcodeValue(value)
		}
		setShowScanChoices(false);
	};
	return (
		<Container
			noPadding
			header={ {
				title: 'Validasi Client ID',
				type: 'regular'
			} }
		>

			<ClientCard isValidated={ true } />
			<ClientCard onOpenScanChoice={ () => setShowScanChoices(true) } />
			<ClientCard onOpenScanChoice={ () => setShowScanChoices(true) } />
			<Button
				mt={ 30 }
				weight='700'
				color={ Colors.white.pure }
				text='Mulai Pengiriman'
				onPress={ () => NavigationHelper.push('ItemChecking') }
			/>
			<BottomSheet
				visible={ showScanChoices }
				onRequestClose={ () => setShowScanChoices(false) }
			>
				<ScanChoice onChoosen={handleOnChoosen} />
			</BottomSheet>
			<ModalDialog visible={ showResult }
				onRequestClose={ () => setShowResult(false) }>
				<ContentValidateDialog testBarcodeValue={testBarcodeValue} />
			</ModalDialog>
		</Container>

	);
};

export default ValidateClientID;

const styles = StyleSheet.create({});