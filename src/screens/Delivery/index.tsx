import { FlatList, View } from 'react-native';
import React from 'react';

import { Container, DeliveryItem, Header } from '@components';
import styles from './style';

const Delivery = () => (
	<Container noPaddingTop noPaddingBottom noScroll>
		<Header />

		<FlatList
			bounces={ false }
			style={ styles.container }
			contentContainerStyle={ styles.content }
			data={ Array(5) }
			renderItem={ () => (<DeliveryItem />) }
			ItemSeparatorComponent={ () => (<View style={ { height: 16 } } />) }
		/>

	</Container>
);

export default Delivery;
