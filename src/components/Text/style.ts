import { Colors } from '@constant';
import { Ratio } from '@helpers';
import { StyleSheet, TextStyle } from 'react-native';

interface IStyles {
	defaultStyle: TextStyle,
}

export const styles = StyleSheet.create<IStyles>({
	defaultStyle: {
		color: Colors.black.default,
		fontFamily: 'Ubuntu-Regular',
		fontSize: Ratio.normalizeValue(14),
	},
});
