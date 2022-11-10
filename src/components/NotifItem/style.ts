import { Colors } from '@constant';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyle {
	container: ViewStyle;
	row: ViewStyle;
	bullet: ViewStyle;
	content: ViewStyle;
	line: ViewStyle;
}

export const styles = StyleSheet.create<IStyle>({
	container: {
		flex: -1,
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	bullet: {
		width: 10,
		height: 10,
		backgroundColor: Colors.company.red,
		borderRadius: 5,
		marginTop: 4,
	},

	content: {
		flex: 1,
		marginStart: 10
	},

	line: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.gray.line,
		marginTop: 16,
	}
});
