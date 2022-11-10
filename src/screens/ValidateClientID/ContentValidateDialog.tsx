import { StyleSheet, View, TextStyle } from 'react-native';
import React from 'react';

import { Button, Text } from '@components';
import { Fonts, Colors, Images } from '@constant';

const ContentValidateDialog = () => {
	return (
		<View style={ { alignItems: 'stretch' } }>
			<View style={ styles.header }>
				<Images.IconSuccess />
				<Text format={ Fonts.paragraph.xl.bold as TextStyle } color={ Colors.green.default }>Validasi Berhasil</Text>
				<Text format={ Fonts.paragraph.m.regular as TextStyle } mt={ 10 }>Client ID berhasil ditemukan</Text>

			</View>
			<View style={ styles.content }>
				<View style={ [styles.row, { justifyContent: 'space-between', paddingBottom: 15 }] }>
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
				<View style={ [styles.row, styles.subContent] }>
					<View>
						<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Total Barang</Text>
						<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 } >10 Barang</Text>
					</View>
					<Button
						weight='700'
						color={ Colors.company.red }
						text='Periksa'

						backgroundColor='transparent'
						type='outline'
					// mt={ 30 }
					/>

				</View>
			</View>
			<Button
				mt={ 30 }
				weight='700'
				color={ Colors.white.pure }
				text='Scan Client ID Lainnya'
			/>
		</View>
	);
};

export default ContentValidateDialog;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	content: {
		padding: 15,
		borderColor: Colors.gray.line,
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 15
	},
	subContent: {
		justifyContent: 'space-between',
		paddingTop: 15,
		borderTopColor: Colors.gray.line,
		borderTopWidth: 1,
	},
	header: {
		alignItems: 'center'
	}
});