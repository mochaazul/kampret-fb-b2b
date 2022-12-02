import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';

import { Text } from '@components';
import { Images, Fonts, Colors } from '@constant';
import { DeliveryInterface } from '@interfaces';

interface ItemChecklistProps {
	item: DeliveryInterface.IDeliveryItem,
	onCheckClicked: (id: string) => void;
}

const ItemChecklist = ({ item, onCheckClicked }: ItemChecklistProps) => {

	const renderButton = useMemo(() => {
		if (item.validated)
			return (<Images.ButtonCheck2 />);

		return (<Images.ButtonCheck />);
	}, [item.validated]);

	return (
		<View style={ styles.row }>

			<View>
				<Text format={ Fonts.textBody.l.bold as TextStyle } >{ `${ item.qty } ${ item.name }` }</Text>
				<Text weight='400' size={ 14 } lineHeight={ 20 } color={ Colors.gray.default } mt={ 5 }>{ item.id }</Text>
			</View>

			<TouchableOpacity onPress={ () => onCheckClicked(item.id) }>
				{ renderButton }
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