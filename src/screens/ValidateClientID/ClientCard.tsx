import { StyleSheet, View, TextStyle } from 'react-native';
import React, { Children, useMemo } from 'react';
import { ProgressBar } from '@react-native-community/progress-bar-android';

import { Colors, Images, Fonts } from '@constant';
import { Button, Text } from '@components';
import { DeliveryInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';

interface ClientCardProps {
	customer: DeliveryInterface.IDeliveryCustomer;
	onOpenScanChoice?: () => void;
	deliveryId: string;
}

const ClientCard = ({ customer, onOpenScanChoice, deliveryId }: ClientCardProps) => {

	const renderItemInfo = useMemo(() => {

		const item = {
			info: (customer.numItem ?? 0) + ' barang ',
			infoColor: Colors.company.red,
			desc: 'perlu diperiksa'
		};

		const numValidated = customer.numValidated ?? 0;

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
	}, [customer.numItem, customer.numValidated]);

	const renderProgressBar = useMemo(() => {
		const item = {
			progress: 0,
			color: Colors.gray.default,
		};

		const numValidated = customer.numValidated ?? 0;
		if (numValidated) {
			item.color = Colors.green.default;
			item.progress = customer.numItem ? numValidated / customer.numItem : 0;
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
	}, [customer.numItem, customer.numValidated]);

	const renderButton = useMemo(() => {
		const item = {
			text: 'Periksa Barang',
			color: Colors.company.red
		};

		const numValidated = customer.numValidated ?? 0;
		if (numValidated) {
			if (numValidated < (customer.numItem ?? 0)) {
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
	}, [customer.numItem, customer.numValidated]);

	const renderCustName = useMemo(() => (
		<>
			<Text format={ Fonts.textBody.l.bold as TextStyle }>{ customer.id }</Text>

			<View style={ styles.row }>
				{
					customer.custName &&
					<Text
						format={ Fonts.textBody.m.regular as TextStyle }
						mt={ 10 }
						numberOfLines={ 3 }
					>
						{ customer.custName }
					</Text>
				}

				{
					(customer.numCart ?? 0) > 1 &&
					<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| { customer.numCart } Keranjang</Text>
				}
			</View>
		</>
	), [customer.id, customer.custName, customer.numCart]);

	if (!customer.validated) {
		return (
			<View key={ customer.id } style={ styles.container }>
				<View style={ [styles.row, { justifyContent: 'space-between' }] }>
					<View style={ { flex: 5 } }>
						{ renderCustName }
					</View>

					<Button
						mt={ 20 }
						weight='700'
						color={ Colors.white.pure }
						text='Validasi'
						leadingIcon={ <Images.IconScan style={ { marginEnd: 4 } } /> }
						buttonStyle={ { paddingHorizontal: 20, paddingVertical: 10 } }
						onPress={ () => onOpenScanChoice ? onOpenScanChoice() : null }
						style={ { flex: 3 } }
					/>
				</View>

			</View>
		);
	} else {
		return (
			<View key={ customer.id } style={ styles.container }>
				<View style={ [styles.row, { justifyContent: 'space-between' }] }>
					<View style={ { flex: 5 } }>
						{ renderCustName }
					</View>

					<View style={ [styles.row, { flex: 2 }] }>
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

export default React.memo(
	ClientCard,
	(prev, next) => prev.customer.validated == next.customer.validated
		&& prev.customer.numValidated == next.customer.numValidated
);

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