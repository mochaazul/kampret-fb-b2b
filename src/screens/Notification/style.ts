import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white.pure,
		paddingHorizontal: 0
	},

	content: {
		paddingVertical: 16,
		paddingHorizontal: 24,
	},

	line: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.gray.line,
		marginVertical: 16,
	}
});

export default styles;
