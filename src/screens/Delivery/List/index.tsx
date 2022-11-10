import { FlatList, View } from 'react-native';
import React from 'react';

import { DeliveryItem } from '@components';
import styles from './style';

const DeliveryList = () => (
	<FlatList
		bounces={ false }
		keyExtractor={ (item, index) => 'tabBar_' + index }
		style={ styles.container }
		contentContainerStyle={ styles.content }
		showsVerticalScrollIndicator={ false }
		data={ [...Array(5).keys()] }
		renderItem={ ({ i }: any) => (<DeliveryItem key={ i } />) }
		ItemSeparatorComponent={ () => (<View style={ { height: 16 } } />) }
	/>
);

export default DeliveryList;
