import React from 'react';
import { StyleSheet, Text as TextNative } from 'react-native';

import { Ratio } from '@helpers';
import { useMemo } from 'react';
import { styles } from './style';
import { ComponentInterface } from '@interfaces';

const Text: React.FC<ComponentInterface.IText> = props => {

	const {
		style,
		lineHeight,
		mt,
		size = 14,
		weight,
		color,
		align,
		...restOfProps
	} = props;

	const usingMemo = useMemo(() => {
		const defaultStyle = { ...styles.defaultStyle };

		if (color) {
			defaultStyle.color = color;
		}

		if (weight) {
			defaultStyle.fontWeight = weight;
		}

		if (size) {
			defaultStyle.fontSize = Ratio.normalizeValue(size);
		}

		if (mt) {
			defaultStyle.marginTop = Ratio.normalizeValue(mt);
		}

		if (lineHeight) {
			defaultStyle.lineHeight = Ratio.normalizeValue(lineHeight);
		}

		if (align) {
			defaultStyle.textAlign = align;
		}

		return {
			defaultStyle,
		};
	}, [color, weight, size, mt, lineHeight, align]);

	return (
		<TextNative
			style={ StyleSheet.flatten([
				usingMemo.defaultStyle,
				style,
			]) }
			adjustsFontSizeToFit
			{ ...restOfProps }
		>{ props.children }
		</TextNative>
	);
};

export default Text;
