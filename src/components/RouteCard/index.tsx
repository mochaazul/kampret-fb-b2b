import React, { useMemo, useCallback, useState } from 'react';
import { Linking, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Colors, Fonts, Images } from '@constant';
import { ComponentInterface, DeliveryInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';

import Button from '../Button/index';
import Text from '../Text/index';

export interface RouteCardParam {
	client: DeliveryInterface.IDeliveryCustomer;
	isLastRoute: boolean | undefined;
	onClick: () => void;
	disabled: boolean | undefined;
}

const RouteCard = ({ client, isLastRoute, onClick, disabled }: RouteCardParam) => {

	const {
		deliveryId,
		id,
		address,
		deliveryTime,
		custName,
		status,
		sequence,
		numItem } = client;

	const [isDelivered, setIsDelivered] = useState(status != 0);

	const onPresssAction = useCallback(() => {
		if (onClick) {
			onClick();
		} else {
			NavigationHelper.push('DeliveryHistoryDetail', { deliveryId, clientId: id });
		}
	}, [onClick, deliveryId, id]);

	const containerStyle = useMemo(() => {
		const style: ViewStyle = { ...styles.container };

		style.marginTop = sequence == 1 ? 20 : 0;
		style.opacity = disabled ? .7 : 1;

		return style;
	}, [sequence, disabled]);

	const renderNumber = useMemo(() => {
		if (!isDelivered)
			return (
				<View style={ disabled ? [styles.number, { backgroundColor: Colors.gray.default }] : styles.number }>
					<Text style={ [Fonts.textBody.l.bold, { color: Colors.white.pure }] as TextStyle }>{ sequence }</Text>
				</View>
			);

		return (
			<View style={ disabled ? [styles.number, { backgroundColor: Colors.gray.default }] : [styles.number, { backgroundColor: Colors.white.pure }] }>
				<Images.IconCheckGreen width={ 23 } height={ 23 } />
			</View>
		);
	}, [isDelivered, sequence]);

	const renderAction = useMemo(() => {
		if (isDelivered) return (
			<View style={ [styles.row, { justifyContent: 'space-between' }] }>
				<View style={ styles.deliveredColumn }>
					<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Total Orderan</Text>
					<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 }>{ numItem } Barang</Text>
				</View>
				<View style={ styles.deliveredColumn }>
					<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Diterima</Text>
					<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 } color={ Colors.green.default }>{ numItem } Barang</Text>
				</View>
				<View>
					<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Keluhan</Text>
					<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 } color={ Colors.company.red }>{ 0 } Barang</Text>
				</View>
			</View>
		);

		return (
			<View style={ [styles.row, { justifyContent: 'space-between' }] }>
				<View style={ styles.totalItem }>
					<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Total Barang</Text>
					<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 }>{ numItem } Barang</Text>
				</View>
				<Button
					disabled={ disabled }
					weight='700'
					color={ Colors.white.pure }
					text='Sudah Sampai'
					onPress={ () => {
						NavigationHelper.push('DeliveryCheck');
					} }
				/>
			</View>
		);
	}, [isDelivered, numItem]);

	return (
		<TouchableOpacity
			style={ containerStyle }
			key={ 'route_' + sequence }
			activeOpacity={ .7 }
			onPress={ onPresssAction }
		>

			<View style={ styles.numbering }>
				{ renderNumber }

				{ !isLastRoute &&
					<View style={ styles.dashLine } />
				}
			</View>
			<View style={ styles.contentContainer }>
				<View style={ disabled ? styles.contentDisabled : styles.content }>

					<View style={ styles.row }>
						<View style={ styles.leftIcon }>
							<Images.IconLocation width={ 16 } height={ 16 } />
						</View>
						<Text style={ [Fonts.textBody.l.bold, styles.text] as TextStyle }>{ custName }</Text>
					</View>

					<View style={ styles.row }>
						<View style={ styles.leftIcon }></View>

						<TouchableOpacity activeOpacity={ .75 } onPress={ () => Linking.openURL(`https://maps.google.com?q=${ address }`) }>
							<Text style={ [styles.text, { textDecorationLine: 'underline' }] } size={ 14 } lineHeight={ 20 } color={ Colors.blue.default } weight='400' >{ address }</Text>
						</TouchableOpacity>
					</View>

					<View style={ styles.timeSection }>
						<View style={ styles.leftIcon } ><Images.IconTime /></View>
						<Text size={ 14 } lineHeight={ 20 } weight='400'>{ deliveryTime } WIB</Text>
						{ !disabled && !isDelivered &&
							<View style={ styles.textBoundaries } >
								<Text color={ Colors.white.pure } format={ Fonts.textBody.s.bold as TextStyle }>30 menit lagi</Text>
							</View> }
					</View>

					{/* <View style={ styles.timeSection }>
						<View style={ styles.leftIcon } ><Images.IconTime /></View>
						<Text size={ 14 } lineHeight={ 20 } weight='400'>Jumlah SO: 2 </Text>
						<Text size={ 14 } lineHeight={ 20 } weight='600'>(SO12345, SO67890)</Text>
					</View>
					<View style={ styles.timeSection }>
						<View style={ styles.leftIcon } ><Images.IconTime /></View>
						<Text size={ 14 } lineHeight={ 20 } weight='400'>Jumlah Keranjang: 2M, 1L, 3XL</Text>
					</View> */}

					{ renderAction }
				</View>
				<View style={ styles.spaceHeight }></View>
			</View>

		</TouchableOpacity >
	);
};

export default RouteCard;

const styles = StyleSheet.create({
	container: {
		//paddingBottom: 20,
		flexDirection: 'row'
	},
	contentContainer: {
		flex: 12,
	},
	content: {
		marginLeft: 10,
		padding: 15,
		backgroundColor: Colors.white.pure,
		borderRadius: 10,
		shadowColor: Colors.gray.default,
		shadowOpacity: 0.04,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		elevation: 5
	},
	contentDisabled: {
		marginLeft: 10,
		padding: 15,
		backgroundColor: Colors.white.pure,
		borderRadius: 10,
	},
	row: {
		flexDirection: 'row',
		marginTop: 10
	},
	numbering: {
		flex: 1
	},
	number: {
		height: 24,
		width: 24,
		backgroundColor: Colors.company.red,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dashLine: {
		borderLeftColor: Colors.gray.default,
		borderStyle: 'dashed',
		borderLeftWidth: 1,
		flex: 1,
		alignSelf: 'center',
		marginTop: 5
	},
	leftIcon: {
		//flex: 1,
		width: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12
	},
	text: {
		flex: 12,
	},
	totalItem: {
		justifyContent: 'center',
	},
	textBoundaries: {
		backgroundColor: Colors.orange.default,
		borderRadius: 15,
		paddingVertical: 5,
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignSelf: 'flex-start',
		marginLeft: 10
	},
	deliveredColumn: {
		borderRightColor: Colors.gray.line,
		borderRightWidth: 1,
		paddingRight: 20
	},
	timeSection: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},

	spaceHeight: {
		height: 20
	},

});