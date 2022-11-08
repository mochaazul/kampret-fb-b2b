import { View, TextStyle } from 'react-native';
import React from 'react';

import { Text } from '@components';
import { Colors, Fonts } from '@constant';

const DeliveryHistory = () => (
	<View style={ {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white.background
	} }
	>

		<Text
			format={ Fonts.paragraph.xl.bold as TextStyle }
			color={ Colors.gray.default }
		>
			TODO: Delivery History List
		</Text>
	</View>
);

export default DeliveryHistory;
