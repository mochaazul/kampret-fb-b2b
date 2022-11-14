import { StyleSheet, TextStyle, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, Images } from '@constant';
import { Button, Text } from '@components';
import { ComponentInterface } from '@interfaces';

const RouteCard = ({
	locationAddress,
	locationTime,
	locationTitle,
	isLastRoute,
	isDelivered,
	disabled,
	numbering,
	totalItem }: ComponentInterface.IRoute) => {
	return (
		<View style={ [styles.container,
		{
			marginTop: numbering === 1 ? 20 : 0,
			opacity: disabled ? 0.7 : 1
		}] } key={ 'route_' + numbering }>

			<View style={ styles.numbering }>
				{ isDelivered &&
					<View style={ disabled ? [styles.number, { backgroundColor: Colors.gray.default }] : [styles.number, { backgroundColor: Colors.white.pure }] }>
						<Images.IconCheckGreen width={ 23 } height={ 23 } />
					</View>
				}
				{ !isDelivered &&
					<View style={ disabled ? [styles.number, { backgroundColor: Colors.gray.default }] : styles.number }>
						<Text style={ [Fonts.textBody.l.bold, { color: '#ffffff' }] as TextStyle }>{ numbering }</Text>
					</View>
				}

				{ !isLastRoute &&
					<View style={ styles.dashLine } />
				}
			</View>
			<View style={ { flex: 12 } }>
				<View style={ disabled ? styles.contentDisabled : styles.content }>
					<View style={ styles.row }>
						<View style={ styles.leftIcon }>
							<Images.IconLocation width={ 16 } height={ 16 } />
						</View>
						<Text style={ [Fonts.textBody.l.bold, styles.text] as TextStyle }>{ locationTitle }</Text>
					</View>
					<View style={ styles.row }>
						<View style={ styles.leftIcon }></View>
						<Text style={ [styles.text, { textDecorationLine: 'underline' }] } size={ 14 } lineHeight={ 20 } color={ Colors.blue.default } weight='400' >{ locationAddress }</Text>
					</View>
					<View style={ { flexDirection: 'row', alignItems: 'center', marginTop: 10 } }>
						<View style={ styles.leftIcon } ><Images.IconTime /></View>
						<Text size={ 14 } lineHeight={ 20 } weight='400'>{ locationTime.startAt + ' - ' + locationTime.estEnd } WIB</Text>
						{ !disabled && !isDelivered &&
							<View style={ styles.textBoundaries } >
								<Text color={ Colors.white.pure } format={ Fonts.textBody.s.bold as TextStyle }>30 menit lagi</Text>
							</View> }
					</View>
					{ !isDelivered &&
						<View style={ [styles.row, { justifyContent: 'space-between' }] }>
							<View style={ styles.totalItem }>
								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Total Barang</Text>
								<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 }>{ totalItem } Barang</Text>
							</View>
							<Button
								disabled={ disabled }
								weight='700'
								color={ Colors.white.pure }
								text='Sudah Sampai'
								onPress={ () => console.log('sampai pressed') }
							/>
						</View>
					}
					{ isDelivered &&
						<View style={ [styles.row, { justifyContent: 'space-between' }] }>
							<View style={ styles.deliveredColumn }>
								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Total Orderan</Text>
								<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 }>{ isDelivered.totalDeliveredItem } Barang</Text>
							</View>
							<View style={ styles.deliveredColumn }>
								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Diterima</Text>
								<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 } color={ Colors.green.default }>{ isDelivered.receivedCount } Barang</Text>
							</View>
							<View>
								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Keluhan</Text>
								<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 } color={ Colors.company.red }>{ isDelivered.complain } Barang</Text>
							</View>
						</View>
					}
				</View>
				<View style={ { height: 20 } }></View>
			</View>

		</View >

	);
};

export default RouteCard;

const styles = StyleSheet.create({
	container: {
		//paddingBottom: 20,
		flexDirection: 'row'
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
	}
});