import { StyleSheet, View, TextStyle } from 'react-native';
import React from 'react';
import { ProgressBar } from '@react-native-community/progress-bar-android';

import { Colors, Images, Fonts } from '@constant';
import { Button, Text } from '@components';
import { DeliveryInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';

interface ClientCardProps {
	customer: DeliveryInterface.IDeliveryCustomer;
	onOpenScanChoice?: () => void;
}

const ClientCard = ({ customer, onOpenScanChoice }: ClientCardProps) => {
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
		const numValidated = customer.items?.filter((val) => val.validated)?.length ?? 0;
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

				<View style={ [styles.row, { marginTop: 30 }] }>

					{
						numValidated == 0 &&
						<>
							<Text format={ Fonts.textBody.l.bold as TextStyle } color={ Colors.company.red }>{ customer.items?.length } barang </Text>
							<Text format={ Fonts.textBody.l.bold as TextStyle }>perlu diperiksa</Text>
						</>
					}

					{
						(numValidated > 0 && numValidated < (customer.items?.length ?? 0)) &&
						(
							<>
								<Text format={ Fonts.textBody.l.bold as TextStyle } color={ Colors.green.default }>5 </Text>
								<Text format={ Fonts.textBody.l.bold as TextStyle }>dari 10 barang sudah sesuai</Text>
							</>
						)
					}

					{
						(numValidated > 0 && numValidated == (customer.items?.length ?? 0)) &&
						(
							<>
								<Text format={ Fonts.textBody.l.bold as TextStyle } color={ Colors.green.default }>{ customer.items?.length } barang sudah sesuai</Text>
							</>
						)
					}
				</View>

				<ProgressBar
					styleAttr='Horizontal'
					indeterminate={ false }
					progress={ numValidated / (customer.items?.length ?? 0) }
					color={ numValidated > 0 ? Colors.green.default : Colors.gray.default }
					style={ styles.progressBar }
				/>

				{
					(numValidated > 0 && numValidated == (customer.items?.length ?? 0)) &&
					<Button
						weight='700'
						color={ Colors.gray.default }
						text='Lihat Detail'
						backgroundColor='transparent'
						type='outline'
						onPress={ () => NavigationHelper.push('ItemChecking') }
					/>
				}

				{
					numValidated > 0 && numValidated < (customer.items?.length ?? 0) &&
					<Button
						weight='700'
						color={ Colors.company.red }
						text='Lanjutkan Pemeriksaan'
						backgroundColor='transparent'
						type='outline'
						onPress={ () => NavigationHelper.push('ItemChecking') }
					/>
				}

				{
					numValidated == 0 &&
					<Button
						weight='700'
						color={ Colors.company.red }
						text='Periksa Barang'
						backgroundColor='transparent'
						type='outline'
						onPress={ () => NavigationHelper.push('ItemChecking') }
					/>
				}

			</View>
		);
	}
};

export default ClientCard;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	container: {
		padding: 20,
		marginTop: 20,
		marginBottom: 2,
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