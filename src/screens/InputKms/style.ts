import { Colors } from '@constant';
import { Ratio } from '@helpers';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

	addImage: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
		paddingHorizontal: 20,
		paddingTop: 48,
		paddingBottom: 32,
		borderRadius: 12,
		borderColor: Colors.gray.default,
		borderStyle: 'dashed',
		borderWidth: 1,
		height: 300
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
	},

	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20,
	},
});

export default styles;