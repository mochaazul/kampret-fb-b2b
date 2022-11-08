import { View } from 'react-native';
import React from 'react';

import { Container, DeliveryItem, Header } from '@components';
import styles from './style';

const Delivery = () => (
	<Container noPaddingTop>
		<Header />
		<View style={ styles.container }>
			<DeliveryItem />
			<DeliveryItem />
			<DeliveryItem />
			<DeliveryItem />
			<DeliveryItem />
			<DeliveryItem />
		</View>
	</Container>
);

export default Delivery;
