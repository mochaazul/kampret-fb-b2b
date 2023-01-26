import { Colors } from "@constant";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: { paddingHorizontal: 0 },

	customerInfo: {
		flexDirection: 'row',
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: Colors.white.pure,
	},

	label: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: Colors.white.pure,
	},

	separator: {
		height: 10,
		backgroundColor: Colors.gray.line
	},

	section: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: Colors.white.pure,
	},

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
		height: 160
	},
	progressBar: {
		marginTop: 10,
		marginBottom: 20,
		transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
		borderRadius: 10,
		width: '100%'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});