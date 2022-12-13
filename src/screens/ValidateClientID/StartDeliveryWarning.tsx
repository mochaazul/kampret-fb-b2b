import React from "react";
import { Button, Text } from "@components";
import { Colors, Fonts, Images } from "@constant";
import { StyleSheet, TextStyle, View } from "react-native";
import { NavigationHelper } from "@helpers";

interface StartWarningProps {
	onCancel?: () => void;
	deliveryId?: string;
};

const StartDeliveryWarning = ({ onCancel, deliveryId }: StartWarningProps) => {
	return (
		<View style={ { alignItems: 'stretch' } }>
			<View style={ styles.header }>
				<Images.IconWarning />

				<View style={ { flexDirection: 'row' } }>
					<Text format={ Fonts.paragraph.xl.boldCenter as TextStyle } align='center' color={ Colors.black.default }>
						Masih terdapat
						<Text format={ Fonts.paragraph.xl.bold as TextStyle } color={ Colors.company.red }> 10 barang </Text>
						yang belum diperiksa
					</Text>

				</View>

			</View>

			<Text
				mt={ 16 }
				align='center'
				format={ Fonts.paragraph.m.regularCenter as TextStyle }
				color={ Colors.black.default }
			>
				Apakah anda yakin tetap ingin memulai pengiriman? Dengan mengetuk tombol “Mulai Pengiriman”, driver akan bertanggung jawab terhadap
				<Text color={ Colors.company.red } format={ Fonts.paragraph.m.bold as TextStyle }> T&C Driver Freshbox.</Text>
			</Text>

			<Button
				mt={ 24 }
				weight='700'
				color={ Colors.white.pure }
				text='Ya, Mulai Pengiriman'
				onPress={ () => NavigationHelper.push('InputKms', { deliveryId }) }
			/>

			<Button
				mt={ 16 }
				weight='700'
				backgroundColor='transparent'
				type='outline'
				color={ Colors.company.red }
				text='Tidak, Kembali'
				onPress={ onCancel }
			/>
		</View>
	);
};

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

export default React.memo(StartDeliveryWarning);