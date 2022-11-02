import { Colors } from '@constant';
import { StyleSheet, ViewStyle } from 'react-native';

interface IStyle {
	defaultStyle: ViewStyle;
}
export const styles = StyleSheet.create<IStyle>({
	defaultStyle: {
		padding: 14,
		backgroundColor: Colors.black.default,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: Colors.black.default,
	},
});
