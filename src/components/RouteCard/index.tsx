import React, { useMemo, useCallback } from 'react';
import { Linking, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import moment from 'moment';

import { Colors, Fonts, Images } from '@constant';
import { DeliveryInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';
import { Variables } from '@constant';

import Button from '../Button/index';
import Text from '../Text/index';

export interface RouteCardParam {
	client: DeliveryInterface.IDeliveryCustomer;
	isLastRoute: boolean | undefined;
	onClick: () => void;
	disabled: boolean | undefined;
	loading: boolean | undefined;
	onStart?: () => void;
	onArrived?: () => void;
	onFinish?: () => void;
	onRedirect?: () => void;
	onClickCart: () => void;
	onClickSo: () => void;
	onReportClick?: (clientId: string) => void;
	historyMode?: boolean;
}

const RouteCard = ({
	client,
	isLastRoute,
	onClick,
	disabled,
	loading,
	onStart,
	onArrived,
	onFinish,
	onRedirect,
	historyMode,
	onClickCart,
	onClickSo,
	onReportClick
}: RouteCardParam) => {

	const {
		deliveryId,
		id,
		address,
		deliveryTime,
		custName,
		status,
		sequence,
		numItem,
		latitude,
		longitude,
		numSo,
		carts,
	} = client;

	const onArrivedPressed = useCallback(() => {
		if (isLastRoute && onFinish) {
			onFinish();
		} else if (!isLastRoute && onArrived) {
			onArrived();
		}
	}, [onArrived, onFinish]);

	const timeLeft = (time: string | undefined): string | null => {
		const maxTime = time ? time.split('-')[1] : null;
		const deliveryTime = maxTime ? moment(maxTime, 'HH:mm').fromNow() : null;
		return deliveryTime;
	};

	const onPresssAction = useCallback(() => {
		if (!onClick) {
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
		if (status != 1 && status != 7) {
			if (!historyMode) {
				return (
					<View style={ disabled ? [styles.number, { backgroundColor: Colors.gray.default }] : styles.number }>
						<Text style={ [Fonts.textBody.l.bold, { color: Colors.white.pure }] as TextStyle }>{ sequence }</Text>
					</View>
				);
			} else {
				return (
					<View style={ disabled ? [styles.number, { backgroundColor: Colors.gray.default }] : [styles.number, { backgroundColor: Colors.white.pure }] }>
						<Images.IconCheckGreen width={ 23 } height={ 23 } />
					</View>
				);
			}

		} else {
			return (
				<View style={ disabled ? [styles.number, { backgroundColor: Colors.gray.default }] : [styles.number, { backgroundColor: Colors.white.pure }] }>
					<Images.IconCheckGreen width={ 23 } height={ 23 } />
				</View>
			);
		}

	}, [status, sequence]);

	const renderTotalBarang = useMemo(() => (
		<View style={ styles.totalItem }>
			<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Total Barang</Text>
			<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 5 }>{ numItem } Barang</Text>
		</View>
	), [numItem]);

	const renderAction = useMemo(() => {
		//make condition by delivery status
		console.log('status delivery', status);
		switch (status) {
			case undefined:
				return (
					<View style={ [styles.row, { justifyContent: 'space-between' }] }>
						<View style={ styles.totalItem } />
						{ !historyMode &&
							<Button
								disabled={ disabled }
								weight='700'
								color={ Colors.white.pure }
								text='Selesai Pengiriman'
								onPress={ onArrivedPressed }
							/>
						}
					</View>
				);
			case Variables.DELIVERY_STATUS.NEED_CONFIRM:
				return (
					<View style={ [styles.row, { justifyContent: 'space-between', alignItems: 'center' }] }>
						{ renderTotalBarang }

						<Text
							color={ Colors.orange.default }
							format={ Fonts.textBody.s.bold as TextStyle }
							style={ styles.labelNeedConfirm }
						>
							Need Confirm
						</Text>
					</View>
				);
			case Variables.DELIVERY_STATUS.FINISH:
				return (
					<View style={ [styles.row, { justifyContent: 'space-between', alignItems: 'center' }] }>
						{ renderTotalBarang }

						<Text
							color={ Colors.green.default }
							format={ Fonts.textBody.s.bold as TextStyle }
							style={ styles.labelComplete }
						>
							Completed
						</Text>
					</View>
				);
			case Variables.DELIVERY_STATUS.VALIDATE_CLIENT:
			case Variables.DELIVERY_STATUS.VALIDATE_ITEM:
				return (
					<View style={ [styles.row, { justifyContent: 'space-between' }] }>
						{ renderTotalBarang }

						{ !historyMode &&
							<Button
								disabled={ disabled }
								weight='700'
								color={ Colors.white.pure }
								text='Mulai Kirim'
								onPress={ () => onStart ? onStart() : null }
							/>
						}
					</View>
				);
			case Variables.DELIVERY_STATUS.ARRIVED:
				return (
					<View style={ [styles.row, { justifyContent: 'space-between' }] }>
						{ renderTotalBarang }

						{ !historyMode &&
							<Button
								disabled={ disabled }
								weight='700'
								color={ Colors.white.pure }
								text='Sudah Sampai'
								onPress={ onRedirect }
							/>
						}
					</View>
				);
			case Variables.DELIVERY_STATUS.SENT:
				return (
					<View style={ [styles.row, { justifyContent: 'space-between' }] }>
						{ renderTotalBarang }

						{ !historyMode &&
							<Button
								disabled={ disabled }
								weight='700'
								color={ Colors.white.pure }
								text='Sudah Sampai'
								onPress={ onArrivedPressed }
							/>
						}
					</View>
				);
			// case Variables.DELIVERY_STATUS.VALIDATE_ITEM:
			// 	return (
			// 		<View style={ [styles.row, { justifyContent: 'space-between' }] }>
			// 			<View style={ styles.totalItem }>
			// 				<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>Item Not Validate</Text>
			// 			</View>
			// 		</View>
			// 	);
		}
	}, [numItem, status, loading, disabled]);

	return (
		<TouchableOpacity
			style={ containerStyle }
			key={ 'route_' + sequence }
			activeOpacity={ .7 }
			onPress={ onPresssAction }
			disabled={ true }
		>

			<View style={ styles.numbering }>
				{ renderNumber }

				{ !isLastRoute &&
					<View style={ styles.dashLine } />
				}
			</View>
			<View style={ styles.contentContainer }>
				<View style={ disabled ? styles.contentDisabled : styles.content }>

					<View style={ [styles.row, { alignItems: 'center' }] }>
						<View style={ styles.leftIcon }>
							<Images.IconLocation width={ 16 } height={ 16 } />
						</View>
						<Text style={ [Fonts.textBody.l.bold, styles.text] as TextStyle }>{ custName }</Text>
						<TouchableOpacity
							disabled={ disabled }
							style={ styles.reportButton }
							onPress={ () => onReportClick ? onReportClick(client.id) : null }>
							<Images.IconAlert />
						</TouchableOpacity>
					</View>

					<View style={ { marginTop: 10, marginLeft: 32 } }>
						<View style={ styles.leftIcon }></View>
						<TouchableOpacity
							activeOpacity={ .75 }
							onPress={ () => Linking.openURL(`https://maps.google.com?q=${ (latitude && longitude) ? `${ latitude },${ longitude }` : address }`) }
						>
							<Text
								style={ styles.text }
								size={ 14 }
								lineHeight={ 20 }
								color={ Colors.gray.default }
								weight='400'
							>
								{ address }
							</Text>


							<Text
								style={ [styles.text, { textDecorationLine: 'underline', marginTop: 6 }] }
								size={ 14 }
								lineHeight={ 20 }
								color={ Colors.blue.default }
								weight='400'
							>
								Buka Google Maps
							</Text>

						</TouchableOpacity>
					</View>



					<View style={ styles.timeSection }>
						<View style={ styles.leftIcon } ><Images.IconTime /></View>
						<Text size={ 14 } lineHeight={ 20 } weight='400'>{ deliveryTime } WIB</Text>
						{ !disabled && (status ?? 0) < 6 && deliveryTime &&
							<View style={ styles.textBoundaries } >
								<Text color={ Colors.white.pure } format={ Fonts.textBody.s.bold as TextStyle }>{ timeLeft(deliveryTime) }</Text>
							</View> }
					</View>

					{
						status != undefined &&
						<View
							style={ {
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: Colors.gray.info,
								paddingHorizontal: 20,
								paddingVertical: 10,
								marginVertical: 16
							} }
						>
							<TouchableOpacity onPress={ onClickSo }>
								<View style={ { flex: 1, flexDirection: 'row', alignItems: 'center' } }>
									<Text
										format={ Fonts.textBody.m.regular as TextStyle }
										color={ Colors.gray.default }
									>
										Total SO
									</Text>

									<Images.IconChevronRight width={ 10 } height={ 8 } style={ { marginStart: 12 } } />
								</View>

								<Text
									format={ Fonts.textBody.m.bold as TextStyle }
									color={ Colors.black.default }
									style={ { marginTop: 6 } }
								>
									{ numSo }
								</Text>
							</TouchableOpacity>

							<View style={ { width: 1, height: '100%', backgroundColor: Colors.gray.separator } } />

							<TouchableOpacity onPress={ onClickCart }>
								<View style={ { flex: 1, flexDirection: 'row', alignItems: 'center' } }>
									<Text
										format={ Fonts.textBody.m.regular as TextStyle }
										color={ Colors.gray.default }
									>
										Keranjang
									</Text>

									<Images.IconChevronRight width={ 10 } height={ 8 } style={ { marginStart: 12 } } />
								</View>

								<Text
									format={ Fonts.textBody.m.bold as TextStyle }
									color={ Colors.green.default }
									style={ { marginTop: 6 } }
								>
									{ carts?.length }
								</Text>
							</TouchableOpacity>
						</View>
					}

					{ renderAction }
				</View>
				<View style={ styles.spaceHeight }></View>
			</View>

		</TouchableOpacity >
	);
};

export default React.memo(
	RouteCard,
	(prev, next) =>
		prev.client.status != next.client.status
);

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
	labelComplete: {
		borderRadius: 48,
		backgroundColor: Colors.green.light,
		paddingHorizontal: 10,
		paddingVertical: 6
	},
	labelNeedConfirm: {
		borderRadius: 48,
		backgroundColor: Colors.orange.light,
		paddingHorizontal: 10,
		paddingVertical: 6
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

	reportButton: {
		padding: 10
	}
});