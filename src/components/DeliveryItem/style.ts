import { Colors } from '@constant';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyle {
	row: ViewStyle;
	rowContent: ViewStyle;
	container: ViewStyle;
	line: ViewStyle;
}

export const styles = StyleSheet.create<IStyle>({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	rowContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
	},

	container: {
		flex: -1,
		padding: 20,
		margin: 2,
		marginTop: 20,
		backgroundColor: Colors.white.background,
		borderRadius: 10,
		shadowColor: Colors.gray.default,
		shadowOpacity: 0.04,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		elevation: 5,
	},

	line: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.gray.line,
		marginTop: 16,
	}
});
