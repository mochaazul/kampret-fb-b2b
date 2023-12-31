import { Colors } from '@constant';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyle {
	row: ViewStyle;
	container: ViewStyle;
	regularHeader: ViewStyle;
	actionButton: ViewStyle;
	title: ViewStyle;
	version: TextStyle;
	rightIcon: ViewStyle;
	icon: ViewStyle;
	badge: ViewStyle;
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
	},

	actionButton: {
		width: 48
	},

	title: {
		flex: 1,
		paddingVertical: 20
	},

	version: {
		position: 'absolute',
		right: 100,
		color: Colors.gray.default
	},
	rightIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative'
	},
	icon: {
		marginRight: 20
	},
	badge: {
		width: 10,
		height: 10,
		borderRadius: 50,
		position: 'absolute',
		backgroundColor: Colors.red.gradient1,
		top: -5,
		right: 0
	}
});
