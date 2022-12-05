import React from "react";
import { TextStyle, View, StyleSheet } from "react-native";

import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper } from '@helpers';
import { DeliveryInterface } from "@interfaces";
import { Button, Text } from "@components";

const DeliveryItem: React.FC<DeliveryInterface.IDelivery> = props => {

	const {
		id,
		numLocation,
		date,
		totalItem,
		status,
	} = props;

	return (
		<View style={ styles.container } key={ id }>
			<View style={ styles.row }>
				<Text
					format={ Fonts.paragraph.xl.bold as TextStyle }
					color={ Colors.black.default }
				>
					{ id }
				</Text>

				<Images.More />
			</View>

			<View style={ styles.line } />

			<View style={ styles.rowContent } >
				<Images.IconLocation
					width={ 16 }
					height={ 16 }
					style={ { marginEnd: 12 } } />

				<Text
					format={ Fonts.paragraph.m.regular as TextStyle }
					color={ Colors.black.default }
				>
					{ numLocation } Lokasi
				</Text>
			</View>

			<View style={ styles.rowContent } >
				<Images.IconTime
					width={ 16 }
					height={ 16 }
					style={ { marginEnd: 12 } } />

				<Text
					format={ Fonts.paragraph.m.regular as TextStyle }
					color={ Colors.black.default }
				>
					{ date }
				</Text>
			</View>

			<View style={ [styles.row, { marginTop: 24 }] }>
				<View>
					<Text
						format={ Fonts.paragraph.m.regular as TextStyle }
						color={ Colors.gray.default }
					>
						Total Barang
					</Text>

					<Text
						format={ Fonts.paragraph.xl.bold as TextStyle }
						color={ Colors.black.default }
					>
						{ totalItem } Barang
					</Text>
				</View>
				{ status == 'deliver' &&
					<Button
						text='Lanjut Pengiriman'
						textSize={ 14 }
						weight='700'
						useShadow={ true }
						leadingIcon={ <Images.IconTruck style={ { marginEnd: 4 } } /> }
						buttonStyle={ { paddingHorizontal: 20, paddingVertical: 10 } }
						onPress={ () => NavigationHelper.push('DeliveryRoute') }
					/>
				}
				{ status == 'new' &&
					<Button
						text='Validasi Client ID'
						textSize={ 14 }
						weight='700'
						useShadow={ true }
						leadingIcon={ <Images.IconScan style={ { marginEnd: 4 } } /> }
						buttonStyle={ { paddingHorizontal: 20, paddingVertical: 10 } }
						onPress={ () => NavigationHelper.push('ValidateClientID', { deliveryId: props.id }) }
					/>
				}

			</View>

		</View>
	);
};

export default React.memo(DeliveryItem);

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	rowContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
	},

	container: {
		flex: -1,
		padding: 20,
		margin: 2,
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
	},

	line: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.gray.line,
		marginTop: 16,
	}
});
