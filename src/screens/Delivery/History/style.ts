import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 64,
	},

	emptyLabel: {
		textAlign: 'center',
	},

	container: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: Colors.white.background
	},

	content: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: Colors.white.background
	}
});

export default styles;
