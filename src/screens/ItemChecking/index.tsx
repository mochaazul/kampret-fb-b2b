import { StyleSheet, View, TextStyle } from 'react-native';
import React from 'react';

import { Container, Text, Button } from '@components';
import { Fonts, Colors, Images } from '@constant';

import ItemChecklist from './ItemChecklist';

const ItemChecking = () => {
	return (
		<Container header={ { title: 'Pemeriksaan Barang', type: 'regular' } } contentBackgroudColor={ Colors.white.pure } noPadding>
			<View style={ [styles.row, styles.header] }>
				<View>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>CID1234567890</Text>
					<View style={ styles.row }>
						<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>Sumorice </Text>
						<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| 2 Keranjang</Text>
					</View>

				</View>
				<View style={ styles.row }>
					<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.green.default }>Tervalidasi </Text>
					<Images.IconCheck />
				</View>
			</View>
			<ItemChecklist
				isChecked={ true }
				item='5 Pack Rumput Laut'
				itemCode='SO0001-01'
			/>
			<ItemChecklist
				isChecked={ false }
				item='5 Pack Rumput Laut'
				itemCode='SO0001-01'
			/>
			<ItemChecklist
				isChecked={ false }
				item='5 Pack Rumput Laut'
				itemCode='SO0001-01'
			/>
			<ItemChecklist
				isChecked={ true }
				item='5 Pack Rumput Laut'
				itemCode='SO0001-01'
			/>
			<View>
				<Images.ButtonCircleScan style={ { alignSelf: 'flex-end', marginTop: 50 } } />
				<Button
					mt={ 30 }
					weight='700'
					color={ Colors.white.pure }
					text='Selesai Pemeriksaan'
				/>
			</View>
		</Container>
	);
};

export default ItemChecking;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	header: {
		justifyContent: 'space-between',
		paddingVertical: 20,
		backgroundColor: Colors.white.pure,
		borderTopColor: Colors.gray.line,
		borderTopWidth: 1,
	},
	footer: {
		position: 'absolute',
		bottom: 20,
		flex: 1
	}
});