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
	}
});