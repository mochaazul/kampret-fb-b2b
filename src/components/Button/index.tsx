import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '@constant';
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
		buttonStyle,
		children,
		...restOfProps
	} = props;

	const usingMemo = useMemo(() => {
		const defaultStyle = { ...styles.defaultStyle };

		if (backgroundColor) {
			defaultStyle.backgroundColor = backgroundColor;
		}

		if (circle) {
			defaultStyle.borderRadius = 100;
		}

		if (width) {
			defaultStyle.width = Ratio.normalizeValue(width);
		}

		if (noPadding) {
			defaultStyle.paddingTop = 0;
			defaultStyle.paddingBottom = 0;
			defaultStyle.paddingLeft = 0;
			defaultStyle.paddingRight = 0;
		}

		if (mt) {
			defaultStyle.marginTop = Ratio.normalizeValue(mt);
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

	return (
		<TouchableOpacity
			style={ StyleSheet.flatten([usingMemo.defaultStyle, buttonStyle]) }
			{ ...restOfProps }
			activeOpacity={ 0.75 }>
			<View style={ { flexDirection: 'row', alignItems: 'center' } }>
				{ text && (
					<Text
						style={ textStyle }
						size={ textSize }
						weight={ weight }
						color={ color ? color : type === 'outline' ? Colors.black.default : Colors.yellow.default }>{ text }</Text>
				) }
				{ children && children }
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(Button);
