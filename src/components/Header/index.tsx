import { TextStyle, View } from 'react-native';
import React from 'react';

import { Images, Fonts, Colors } from '@constant';
import { styles } from './style';
import Text from '../Text';

const index = () => {
	return (
		<View style={ styles.container }>
			<View style={ styles.row }>
				<Images.LogoFB />
				<Images.Bell />
			</View>
			<View style={ [styles.row, { marginTop: 20 }] }>
				<View style={ { paddingVertical: 10, borderBottomColor: Colors.company.red, borderBottomWidth: 3 } }>
					<Text format={ Fonts.textBody.l.bold as TextStyle } color={ Colors.company.red }>Pengiriman</Text>
				</View>
				<View style={ { marginLeft: 30, paddingVertical: 10, flex: 1 } }>
					<Text format={ Fonts.textBody.l.bold as TextStyle } color={ Colors.company.red }>Riwayat Pengiriman</Text>
				</View>

			</View>
		</View>
	);
};

export default index;