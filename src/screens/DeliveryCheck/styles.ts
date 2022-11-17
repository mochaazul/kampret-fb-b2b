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
});