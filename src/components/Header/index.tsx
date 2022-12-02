import { View, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo } from 'react';

import { ComponentInterface } from '@interfaces';
import { Dispatches, Images } from '@constant';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { styles } from './style';

import Text from '../Text/index';
import env from '../../../env';
import { store } from '../../config/reduxConfig';

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

	const {notif} = useAppSelector(state => state.miscReducers)
	const renderBadge = useMemo(() => {
		if(notif) {
			return <View style={styles.badge} />
		}
	}, [notif])


	const handleClickNotification = useCallback(
		() => {
			const params = {
				item: null as boolean | null
			}
			if(notif) {
				params.item = notif
				store.dispatch({
					type: Dispatches.TMP_NOTIF,
					payload: false
				})
			}
			NavigationHelper.push('Notification',{...params}) 
		},
		[notif],
	)
	


	if (!type || type == 'main') {
		return (
			<View style={ styles.container }>
				<View style={ styles.row }>
					<Text size={ 9 } style={ styles.version }>ver { env.version }</Text>
					<Images.LogoFB />
					<View style={ styles.rightIcon }>
						<TouchableOpacity
							activeOpacity={ .75 }
							style={ styles.icon }
							onPress={ handleClickNotification}
						>
							<Images.Bell />
							{renderBadge}
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={ .75 }
							onPress={ () => onPressRightButton ? onPressRightButton() : null }
						>
							<Images.IconLogout />
						</TouchableOpacity>
					</View>

				</View>
			</View>
		);
	} else {
		return (
			<View style={ [styles.regularHeader, headerStyle] }>
				<View style={ styles.actionButton }>
					{
						showLeftButton !== false && <TouchableOpacity onPress={ () => NavigationHelper.pop(1) }>
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