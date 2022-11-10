import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white.pure,
		paddingHorizontal: 0
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

	tabFirst: {
		marginStart: 30,
	},

	tabNotFirst: {
		marginStart: 20,
	},

});

export default styles;
