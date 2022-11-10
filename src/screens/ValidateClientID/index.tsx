import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { Container, BottomSheet, ModalDialog } from '@components';
import ClientCard from './ClientCard';
import ScanChoice from './ScanChoice';
import ContentValidateDialog from './ContentValidateDialog';

const ValidateClientID = () => {
	const [showScanChoices, setShowScanChoices] = useState<boolean>(false);
	const [showResult, setShowResult] = useState<boolean>(false);

	const handleOnChoosen = (value: string) => {
		if (value == 'result') {
			setShowResult(true);
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
		</Container>

	);
};

export default ValidateClientID;

const styles = StyleSheet.create({});