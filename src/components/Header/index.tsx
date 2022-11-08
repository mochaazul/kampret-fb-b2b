import { TextStyle, View, TouchableOpacity } from 'react-native';
import React from 'react';

import { ComponentInterface } from '@interfaces';
import { Images, Fonts, Colors } from '@constant';
import { styles } from './style';
import { Text } from '@components';

const Header: React.FC<ComponentInterface.IHeader> = props => {
	const {
		title,
		type,
		rightButton,
		onPressRightButton,
		...resOfProps
	} = props;
	if (!type || type == 'main') {
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
	} else {
		return (
			<View style={ [styles.container, styles.regularHeader] }>
				<View>
					<Images.IconBack />
				</View>
				<View>
					{ title &&
						<Text
							weight='700'
							size={ 16 }
							lineHeight={ 18 }
							align='center'>
							{ title }
						</Text>
					}
				</View>
				{ rightButton && onPressRightButton &&
					<TouchableOpacity onPress={ () => onPressRightButton() }>
						{ rightButton }
					</TouchableOpacity>
				}
				<View>

				</View>
			</View>
		);

	}

};

export default Header;