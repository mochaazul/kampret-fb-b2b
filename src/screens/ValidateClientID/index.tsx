import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Container } from '@components';
import ClientCard from './ClientCard';

const ValidateClientID = () => {
	return (
		<Container
			noPadding
			header={ {
				title: 'Validasi Client ID',
				type: 'regular'
			} }
		>

			<ClientCard isValidated={ true } />
			<ClientCard />
			<ClientCard />
		</Container>

	);
};

export default ValidateClientID;

const styles = StyleSheet.create({});