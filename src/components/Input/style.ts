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
		padding: 0
	},
	inputContainer: {

	},
	input: {
		marginTop: 5,
		backgroundColor: Colors.white.background,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.gray.line,
	},
});
