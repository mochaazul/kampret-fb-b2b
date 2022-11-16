import { Button, Text } from "@components";
import { Colors, Fonts } from "@constant";
import { NavigationHelper } from "@helpers";
import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";

interface ConfirmArrivalProp {
	onClose?: () => void;
}

const ConfirmArrival = ({ onClose }: ConfirmArrivalProp) => {
	return (
		<View style={ styles.container }>
			<Text
				format={ Fonts.heading.h3 as TextStyle }
				color={ Colors.black.default }
			>
				Apakah anda yakin pengiriman sudah sesuai?
			</Text>

			<Text
				format={ Fonts.paragraph.m.regular as TextStyle }
				color={ Colors.gray.default }
				mt={ 10 }
			>
				Dengan menekan tombol “Ya, Saya Yakin” berarti anda akan bertanggung jawab penuh terhadap pengiriman ini.
			</Text>

			<View style={ styles.buttons }>
				<Button
					noPadding
					type="outline"
					text="Ya, Saya Yakin"
					backgroundColor="transparent"
					color={ Colors.company.red }
					buttonStyle={ styles.button }
					onPress={ () => NavigationHelper.push('InputKms') }
				/>

				<View style={ { width: 20 } } />

				<Button
					text="Tidak"
					style={ styles.button }
					onPress={ onClose }
				/>
			</View>
		</View>
	);
};

export default ConfirmArrival;

const styles = StyleSheet.create({
	container: {
		padding: 20
	},

	buttons: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	button: {
		flex: 1
		// width: 150
	},
});