import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { Text } from '@components';
import { Images, Fonts, Colors } from '@constant';

interface ItemChecklistProps {
	item: string,
	itemCode: string,
	isChecked: boolean,
	itemIndex: number,
	onCheckClicked: (index: number) => void;
}
const ItemChecklist = ({ item, itemCode, isChecked, onCheckClicked, itemIndex }: ItemChecklistProps) => {
	return (
		<View style={ styles.row }>
			<View>
				<Text format={ Fonts.textBody.l.bold as TextStyle } >{ item }</Text>
				<Text weight='400' size={ 14 } lineHeight={ 20 } color={ Colors.gray.default } mt={ 5 }>{ itemCode }</Text>
			</View>
			<TouchableOpacity onPress={ () => onCheckClicked(itemIndex) }>
				{ isChecked &&
					<Images.ButtonCheck2 />
				}
				{ !isChecked &&
					<Images.ButtonCheck /> }
			</TouchableOpacity>

		</View>

	);
};

export default ItemChecklist;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 15,
		borderBottomColor: Colors.gray.line,
		borderBottomWidth: 1
	}
});