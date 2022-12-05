import { StyleSheet, View, TextStyle } from 'react-native';
import React, { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { ProgressBar } from '@react-native-community/progress-bar-android';

import { Colors, Images, Fonts } from '@constant';
import { Button, Text } from '@components';
import { DeliveryInterface } from '@interfaces';
import { NavigationHelper, useAppSelector } from '@helpers';

interface ClientCardProps {
	customer: DeliveryInterface.IDeliveryCustomer;
	onOpenScanChoice?: () => void;
	deliveryId: string;
}

const ClientCard = ({ customer, onOpenScanChoice, deliveryId }: ClientCardProps) => {

	const items = useAppSelector(
		state => state
			.deliveryReducers
			.clientItems
			.filter((item) => item.deliveryId == deliveryId && item.clientId == customer.id),
		shallowEqual
	);

	const renderItemInfo = useMemo(() => {

		const item = {
			info: customer.numItem + ' barang ',
			infoColor: Colors.company.red,
			desc: 'perlu diperiksa'
		};

		const numValidated = items?.filter((item) => item.validated)?.length ?? 0;

		if (numValidated) {
			item.infoColor = Colors.green.default;

			if (numValidated < (customer.numItem ?? 0)) {
				item.info = numValidated + ' ';
				item.desc = 'dari ' + customer.numItem + ' barang sudah sesuai';
			} else {
				item.info = numValidated + ' barang sudah sesuai';
				item.desc = '';
			}
		}

		return (
			<Text format={ Fonts.textBody.l.bold as TextStyle } mt={ 30 }>
				<Text format={ Fonts.textBody.l.bold as TextStyle } color={ item.infoColor }>
					{ item.info }
				</Text>
				{ item.desc }
			</Text>
		);
	}, [customer, items]);

	const renderProgressBar = useMemo(() => {
		const item = {
			progress: 0,
			color: Colors.gray.default,
		};

		const numValidated = customer.items?.filter((val) => val.validated)?.length ?? 0;
		if (numValidated) {
			item.color = Colors.green.default;
			item.progress = numValidated / (customer.items?.length ?? 0);
		}

		return (
			<ProgressBar
				styleAttr='Horizontal'
				indeterminate={ false }
				progress={ item.progress }
				color={ item.color }
				style={ styles.progressBar }
			/>
		);
	}, [customer]);

	const renderButton = useMemo(() => {
		const item = {
			text: 'Periksa Barang',
			color: Colors.company.red
		};

		const numValidated = customer.items?.filter((val) => val.validated)?.length ?? 0;
		if (numValidated) {
			if (numValidated < (customer.items?.length ?? 0)) {
				item.text = 'Lanjutkan Pemeriksaan';
			} else {
				item.text = 'Lihat Detail';
				item.color = Colors.gray.default;
			}
		}

		return (
			<Button
				weight='700'
				color={ item.color }
				text={ item.text }
				backgroundColor='transparent'
				type='outline'
				onPress={ () => NavigationHelper.push(
					'ItemChecking',
					{ deliveryId: deliveryId, clientId: customer.id }
				) }
			/>
		);
	}, [customer]);

	if (!customer.validated) {
		return (
			<View key={ customer.id } style={ styles.container }>
				<View style={ [styles.row, { justifyContent: 'space-between' }] }>
					<View>
						<Text format={ Fonts.textBody.l.bold as TextStyle }>{ customer.id }</Text>

						<View style={ styles.row }>
							{
								customer.custName &&
								<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>{ customer.custName } </Text>
							}

							{
								(customer.numCart ?? 0) > 1 &&
								<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| { customer.numCart } Keranjang</Text>
							}
						</View>

					</View>
					<Button
						mt={ 20 }
						weight='700'
						color={ Colors.white.pure }
						text='Validasi'
						leadingIcon={ <Images.IconScan style={ { marginEnd: 4 } } /> }
						buttonStyle={ { paddingHorizontal: 20, paddingVertical: 10 } }
						onPress={ () => onOpenScanChoice ? onOpenScanChoice() : null }
					/>
				</View>

			</View>
		);
	} else {
		return (
			<View key={ customer.id } style={ styles.container }>
				<View style={ [styles.row, { justifyContent: 'space-between' }] }>
					<View>
						<Text format={ Fonts.textBody.l.bold as TextStyle }>{ customer.id }</Text>

						<View style={ styles.row }>
							{
								customer.custName &&
								<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>{ customer.custName } </Text>
							}

							{
								(customer.numCart ?? 0) > 1 &&
								<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| { customer.numCart } Keranjang</Text>
							}
						</View>

					</View>

					<View style={ styles.row }>
						<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.green.default }>Tervalidasi </Text>
						<Images.IconCheck />
					</View>
				</View>

				{ renderItemInfo }

				{ renderProgressBar }

				{ renderButton }

			</View>
		);
	}
};

export default React.memo(ClientCard);

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	container: {
		padding: 20,
		marginHorizontal: 2,
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
	progressBar: {
		marginTop: 10,
		marginBottom: 20,
		transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
		borderRadius: 10,
	},
});