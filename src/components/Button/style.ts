import { Colors } from '@constant';
import { StyleSheet, ViewStyle } from 'react-native';

interface IStyle {
	defaultStyle: ViewStyle;
}
export const styles = StyleSheet.create<IStyle>({
	defaultStyle: {
		padding: 14,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
