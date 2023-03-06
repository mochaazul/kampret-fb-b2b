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

		return (
			<TouchableOpacity onPress={ () => onCheckClicked(item.id) }>
				{ item.validated ? <Images.ButtonCheck2 /> : <Images.ButtonCheck /> }
			</TouchableOpacity>
		);
	}, [item.validated]);

	return (
		<View style={ styles.row }>

			<View>
				<Text format={ Fonts.textBody.l.bold as TextStyle } >{ `${ item.qty } ${ item.name }` }</Text>
				<Text weight='400' size={ 14 } lineHeight={ 20 } color={ Colors.gray.default } mt={ 5 }>{ item.id }</Text>
			</View>

			{ renderButton }
		</View>
	);
};

export default React.memo(ItemChecklist, (prev, next) => prev.item.validated == next.item.validated);

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 15,
		paddingHorizontal: 20,
	}
});