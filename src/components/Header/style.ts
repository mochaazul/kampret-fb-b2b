import { Colors } from '@constant';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyle {
	row: ViewStyle;
	container: ViewStyle;
	regularHeader: ViewStyle;
}

export const styles = StyleSheet.create<IStyle>({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	container: {
		margin: 20
	},
	regularHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.white.pure,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray.light,
		shadowColor: Colors.gray.line,
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 5,
	}
});
