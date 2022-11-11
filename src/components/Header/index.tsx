import { View, TouchableOpacity } from 'react-native';
import React from 'react';

import { ComponentInterface } from '@interfaces';
import { Images } from '@constant';
import { NavigationHelper } from '@helpers';
import { styles } from './style';
import { Text } from '@components';

const Header: React.FC<ComponentInterface.IHeader> = props => {
	const {
		title,
		type,
		showLeftButton,
		rightButton,
		onPressRightButton,
		headerStyle,
		...resOfProps
	} = props;
	if (!type || type == 'main') {
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
	} else {
		return (
			<View style={ [styles.regularHeader, headerStyle] }>
				<View style={ styles.actionButton }>
					{
						showLeftButton && <TouchableOpacity onPress={ () => NavigationHelper.pop(1) }>
							<Images.IconBack />
						</TouchableOpacity>
					}
				</View>

				<View style={ styles.title }>
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

				<View style={ styles.actionButton }>
					{ rightButton && onPressRightButton &&
						<TouchableOpacity onPress={ () => onPressRightButton() }>
							{ rightButton }
						</TouchableOpacity>
					}
				</View>
			</View>
		);

	}

};

export default Header;