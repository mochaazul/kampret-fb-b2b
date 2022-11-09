import { View } from 'react-native';
import React from 'react';

import { Images } from '@constant';
import { styles } from './style';

const index = () => {
	return (
		<View style={ styles.container }>
			<View style={ styles.row }>
				<Images.LogoFB />
				<Images.Bell />
			</View>
		</View>
	);
};

export default index;