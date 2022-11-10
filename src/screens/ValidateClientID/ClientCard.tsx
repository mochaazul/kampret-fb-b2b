import { StyleSheet, View, TextStyle } from 'react-native';
import React from 'react';

import { Colors, Images, Fonts } from '@constant';
import { Button, Text } from '@components';

interface ClientCardProps {
	isValidated?: boolean;
}
const ClientCard = ({ isValidated }: ClientCardProps) => {
	if (!isValidated) {
		return (
			<View style={ styles.container }>
				<View style={ [styles.row, { justifyContent: 'space-between' }] }>
					<View>
						<Text format={ Fonts.textBody.l.bold as TextStyle }>CID1234567890</Text>
						<View style={ styles.row }>
							<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>Sumorice </Text>
							<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| 2 Keranjang</Text>
						</View>

					</View>
					<Button
						mt={ 20 }
						weight='700'
						color={ Colors.white.pure }
						text='Validasi'
					/>
				</View>

			</View>
		);
	} else {

		return (
			<View style={ styles.container }>
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
				<View style={ [styles.row, { marginTop: 30 }] }>
					<Text format={ Fonts.textBody.l.bold as TextStyle } color={ Colors.green.default }>5 </Text>
					<Text format={ Fonts.textBody.l.bold as TextStyle } >dari 10 barang sudah sesuai</Text>
				</View>

				<Button
					weight='700'
					color={ Colors.company.red }
					text='Lanjutkan Pemeriksaan'

					backgroundColor='transparent'
					type='outline'
					mt={ 20 }
				/>

			</View>
		);
	}
};

export default ClientCard;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	container: {
		padding: 20,
		marginTop: 20,
		backgroundColor: Colors.white.pure,
		borderRadius: 10,
		shadowColor: Colors.gray.default,
		shadowOpacity: 0.04,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		elevation: 5,
	}
});