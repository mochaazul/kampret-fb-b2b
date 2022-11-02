import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, Text } from '@components';

const Register = () => {
	return (
		<Container noPadding>
			<View style={ styles.container } >
				<Text
					weight='700'
					size={ 24 }>Register</Text>
			</View>
		</Container>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Register;
