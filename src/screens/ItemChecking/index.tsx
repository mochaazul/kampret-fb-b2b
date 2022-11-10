import { StyleSheet, View, TextStyle } from 'react-native';
import React from 'react';

import { Container, Text } from '@components';
import { Fonts, Colors, Images } from '@constant';

const ItemChecking = () => {
	return (
		<Container header={ { title: 'Pemeriksaan Barang' } }>
			<View style={ [styles.row, { justifyContent: 'space-between' }] }>
				<View>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>CID1234567890</Text>
					<View style={ styles.row }>
						<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>Sumorice </Text>
						<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| 2 Keranjang</Text>
					</View>

				</View>
				<View style={ styles.row }>
					<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.green.default }>Tervalidasi </Text>
					<Images.IconCheck />
				</View>
			</View>
		</Container>
	);
};

export default ItemChecking;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
});