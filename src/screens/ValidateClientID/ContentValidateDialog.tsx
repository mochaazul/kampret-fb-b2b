import React, { useEffect } from 'react';
import { StyleSheet, View, TextStyle } from 'react-native';
import Toast from 'react-native-toast-message';

import { Button, Text } from '@components';
import { Fonts, Colors, Images } from '@constant';
import { DeliveryInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';

type ContentValidateDialogParams = {
	client: DeliveryInterface.IDeliveryCustomer | undefined;
	onCheckOther: () => void;
	deliveryId: string | undefined;
};

const ContentValidateDialog = ({ client, onCheckOther, deliveryId }: ContentValidateDialogParams) => {

	useEffect(() => {
		// check if client undefined
		if (!client) {
			Toast.show({
				type: 'error',
				text1: 'Terjadi Kesalahan',
				text2: 'Invalid client'
			});
			onCheckOther();
		}
	}, []);

	return (
		<View style={ { alignItems: 'stretch' } }>
			<View style={ styles.header }>
				<Images.IconSuccess />
				<Text format={ Fonts.paragraph.xl.bold as TextStyle } color={ Colors.green.default }>Validasi Berhasil</Text>
				<Text format={ Fonts.paragraph.m.regular as TextStyle } mt={ 10 }>Client ID berhasil ditemukan</Text>

			</View>
			<View style={ styles.content }>
				<View style={ [styles.row, { justifyContent: 'space-between', paddingBottom: 15 }] }>
					<View style={ { flex: 5 } }>
						<Text format={ Fonts.textBody.l.bold as TextStyle }>{ client?.id }</Text>
						<View style={ styles.row }>
							<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>{ client?.custName } </Text>
							{/* <Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| 2 Keranjang</Text> */ }
						</View>

					</View>
					<View style={ [styles.row, { flex: 3 }] }>
						<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.green.default }>Tervalidasi </Text>
						<Images.IconCheck />
					</View>
				</View>
				<View style={ [styles.row, styles.subContent] }>
					<View>
						<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Total Barang</Text>
						<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 } >{ client?.numItem } Barang</Text>
					</View>
					<Button
						weight='700'
						color={ Colors.company.red }
						text='Periksa'
						backgroundColor='transparent'
						type='outline'
						onPress={ () => {
							onCheckOther();
							NavigationHelper.push('ItemChecking', { deliveryId: deliveryId, clientId: client?.id });
						} }
					/>

				</View>
			</View>
			<Button
				mt={ 30 }
				weight='700'
				color={ Colors.white.pure }
				text='Scan Client ID Lainnya'
				onPress={ onCheckOther }
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