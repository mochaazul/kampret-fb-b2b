import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { Container, BottomSheet } from '@components';
import ClientCard from './ClientCard';
import ScanChoice from './ScanChoice';

const ValidateClientID = () => {
	const [showScanChoices, setShowScanChoices] = useState<boolean>(false);
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
				<ScanChoice onChoosen={ () => setShowScanChoices(false) } />
			</BottomSheet>
		</Container>

	);
};

export default ValidateClientID;

const styles = StyleSheet.create({});