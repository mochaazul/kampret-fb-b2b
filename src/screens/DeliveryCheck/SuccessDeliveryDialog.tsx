import { StyleSheet, View, TextStyle } from 'react-native';
import React from 'react';

import { Button, Text } from '@components';
import { Fonts, Colors, Images } from '@constant';
import { NavigationHelper } from '@helpers';

type SuccessDeliveryDialogProps = {
	testBarcodeValue?: string;
	custName?: string;
	time?: string;
	onButtonPressed: () => void;
};

const SuccessDeliveryDialog = ({
	testBarcodeValue,
	custName,
	time, onButtonPressed
}: SuccessDeliveryDialogProps) => {
	return (
		<View style={ { alignItems: 'stretch' } }>
			<View style={ styles.header }>
				<Images.IconSuccess />

				<Text format={ Fonts.paragraph.xl.bold as TextStyle } color={ Colors.green.default }>Pengiriman Selesai</Text>

				<Text format={ Fonts.paragraph.m.regular as TextStyle } mt={ 10 } style={ { textAlign: 'center' } }>
					Terima kasih anda telah berhasil menyelesaikan pengiriman ke
					<Text format={ Fonts.paragraph.m.bold as TextStyle } numberOfLines={ 2 } > { custName }.</Text>
				</Text>

			</View>
			<View style={ styles.content }>
				<View style={ [styles.row, { justifyContent: 'space-between' }] }>
					<View>
						<Text format={ Fonts.textBody.l.bold as TextStyle }>{ testBarcodeValue }</Text>

						<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>{ custName } </Text>

						<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>{ time }</Text>

					</View>

					<View style={ styles.row }>
						<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.green.default }>Selesai </Text>
						<Images.IconCheck />
					</View>
				</View>
			</View>
			<Button
				mt={ 30 }
				weight='700'
				color={ Colors.white.pure }
				text='Lanjut Pengiriman Lainnya'
				onPress={ () => onButtonPressed() }
			/>
		</View>
	);
};

export default SuccessDeliveryDialog;

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