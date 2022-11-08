import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
	},

	content: {
		paddingTop: 16,
		paddingBottom: 16,
	},

	tabItem: {
		flex: 0,
		paddingVertical: 10,
		borderBottomWidth: 3,
	},

	tabActive: {
		borderBottomColor: Colors.company.red,
	},

	tabInactive: {
		borderBottomColor: 'transparent',
	},

	tabNotFirst: {
		marginStart: 30,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
});

export default styles;
