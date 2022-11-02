import { Colors } from '@constant';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyle {
	defaultStyle: TextStyle;
	inputContainer: ViewStyle;
	input: ViewStyle;
}

export const styles = StyleSheet.create<IStyle>({
	defaultStyle: {
		flex: 1,
	},
	inputContainer: {

	},
	input: {
		marginTop: 5,
		backgroundColor: Colors.gray.light,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 14,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'transparent',
	},
});
