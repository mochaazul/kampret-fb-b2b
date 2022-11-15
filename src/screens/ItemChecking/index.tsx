import { StyleSheet, View, TextStyle, FlatList } from 'react-native';
import React, { useState } from 'react';

import { Container, Text, Button } from '@components';
import { Fonts, Colors, Images } from '@constant';
import { NavigationHelper } from '@helpers';
import ItemChecklist from './ItemChecklist';

interface ItemCheck {
	item: string,
	itemCode: string,
	checked: boolean;
}
const ItemChecking = () => {
	const [dummyData, setDummyData] = useState<ItemCheck[]>([
		{
			item: '5 Pack Rumput Laut',
			itemCode: 'SO0001-01',
			checked: true
		},
		{
			item: '5 Pack Rumput Laut',
			itemCode: 'SO0001-01',
			checked: false
		},
		{
			item: '5 Pack Rumput Laut',
			itemCode: 'SO0001-01',
			checked: false
		},
		{
			item: '5 Pack Rumput Laut',
			itemCode: 'SO0001-01',
			checked: true
		},
		{
			item: '5 Pack Rumput Laut',
			itemCode: 'SO0001-01',
			checked: false
		},
		{
			item: '5 Pack Rumput Laut',
			itemCode: 'SO0001-01',
			checked: false
		}
	]);

	const handleOnItemChecked = (index: number) => {
		const itemData = dummyData;
		itemData[index].checked = !dummyData[index].checked;
		setDummyData([...itemData]);
	};

	return (
		<Container
			header={ { title: 'Pemeriksaan Barang', type: 'regular' } }
			contentBackgroudColor={ Colors.white.pure } noPadding noScroll>

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
			<FlatList
				data={ dummyData }
				extraData={ dummyData }
				keyExtractor={ (item, index) => 'listItem_' + index }
				showsVerticalScrollIndicator={ false }
				renderItem={ ({ item, index }) =>
				(
					<ItemChecklist
						item={ item.item }
						itemCode={ item.itemCode }
						isChecked={ item.checked }
						itemIndex={ index }
						onCheckClicked={ indexChanged => handleOnItemChecked(indexChanged) }
					/>)
				}
			/>
			<View style={ styles.footer }>
				<Images.ButtonCircleScan style={ { alignSelf: 'flex-end' } } />
				<Button
					mt={ 10 }
					weight='700'
					color={ Colors.white.pure }
					text='Selesai Pemeriksaan'
					onPress={ () => NavigationHelper.push('InputKms') }
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
		bottom: 20
	}
});