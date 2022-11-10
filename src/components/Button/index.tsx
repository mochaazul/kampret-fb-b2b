import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Fonts } from '@constant';
import Text from '../Text';
import { Ratio } from '@helpers';
import { useMemo } from 'react';
import { styles } from './style';
import { ComponentInterface } from '@interfaces';

const Button: React.FC<ComponentInterface.IButton> = props => {

	const {
		text,
		color,
		weight,
		textSize,
		textStyle,
		backgroundColor,
		circle,
		width,
		noPadding,
		type,
		mt,
		disabled,
		useShadow,
		buttonStyle,
		leadingIcon,
		children,
		...restOfProps
	} = props;

	const memoizedStyled = useMemo(() => {
		const defaultStyle = { ...styles.defaultStyle };

		if (backgroundColor) {
			defaultStyle.backgroundColor = backgroundColor;
		}

		if (circle) {
			defaultStyle.borderRadius = 100;
		}

		if (width) {
			defaultStyle.width = Ratio.normalize(width);
		}

		if (noPadding) {
			defaultStyle.paddingTop = 0;
			defaultStyle.paddingBottom = 0;
			defaultStyle.paddingLeft = 0;
			defaultStyle.paddingRight = 0;
		}

		if (mt) {
			defaultStyle.marginTop = Ratio.normalize(mt);
		}

		if (type) {
			switch (type) {
				case 'outline':
					defaultStyle.borderWidth = 1;
					defaultStyle.borderColor = color ?? Colors.black.default;
					defaultStyle.backgroundColor = 'transparent';
					break;
				default:
					break;
			}
		}

		return {
			defaultStyle,
		};
	}, [backgroundColor, circle, width, noPadding, mt, type, color]);
	const shadowed: ViewStyle = {
		shadowColor: '#000',
		shadowOffset: {
			width: -2,
			height: 4,
		},
		shadowOpacity: 0.04,
		shadowRadius: 4.65,
		elevation: 8,
	};
	if (backgroundColor !== 'transparent') {
		return (

			<TouchableOpacity
				disabled={ disabled }
				{ ...restOfProps }
				activeOpacity={ 0.75 }>
				<LinearGradient
					colors={ disabled ? [Colors.white.disabled, Colors.gray.line] : [Colors.red.gradient1, Colors.red.gradient2] }
					locations={ [0, 1] }
					style={ StyleSheet.flatten(!useShadow ? [memoizedStyled.defaultStyle, buttonStyle] : [memoizedStyled.defaultStyle, buttonStyle, shadowed]) }
					start={ { x: 0.0, y: 0.25 } } end={ { x: 0.5, y: 1.0 } }
				>
					<View style={ { flexDirection: 'row', alignItems: 'center' } }>

						{ leadingIcon && leadingIcon }

						{ text && (
							<Text
								format={ Fonts.textBody.m.bold as TextStyle }
								color={ color ? color : type === 'outline' ? Colors.black.default : Colors.white.pure }>{ text }</Text>
						) }
						{ children && children }
					</View>
				</LinearGradient>
			</TouchableOpacity>

		);
	} else {
		return (
			<TouchableOpacity style={ StyleSheet.flatten([memoizedStyled.defaultStyle, buttonStyle]) }

				{ ...restOfProps }
				activeOpacity={ 0.75 }>
				<View style={ { flexDirection: 'row', alignItems: 'center' } }>

					{ leadingIcon && leadingIcon }

					{ text && (
						<Text
							format={ Fonts.textBody.m.bold as TextStyle }
							color={ color ? color : type === 'outline' ? Colors.black.default : Colors.yellow.default }>{ text }</Text>
					) }
					{ children && children }
				</View>
			</TouchableOpacity>
		);
	}

};

export default React.memo(Button);
