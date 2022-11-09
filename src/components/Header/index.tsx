import { TouchableOpacity, View } from 'react-native';
import React from 'react';

import { Images } from '@constant';
import { styles } from './style';
import { NavigationHelper } from '@helpers';

const index = () => {
	return (
		<View style={ styles.container }>
			<View style={ styles.row }>
				<Images.LogoFB />

				<TouchableOpacity
					activeOpacity={ .75 }
					onPress={ () => NavigationHelper.push('Notification') }
				>
					<Images.Bell />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default index;