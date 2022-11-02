import { StyleSheet } from 'react-native';

import { Colors } from '@constant';
import { Ratio } from '@helpers';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	images_container: {
		width: Ratio.screenWidth,
		height: 62 / 100 * Ratio.screenHeight,
	},
	images_shadow: {
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
		opacity: 0.3,
		zIndex: 2,
		position: 'absolute',
	},
	text_skip_container: {
		position: 'absolute',
		top: 70,
		right: 30,
		zIndex: 3,
	},
	images: {
		width: '100%',
		height: '100%',
	},
	sub_container: {
		backgroundColor: 'white',
		borderTopLeftRadius: 30,
		height: 42 / 100 * Ratio.screenHeight,
		zIndex: 5,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 30,
		paddingTop: 30,
		paddingBottom: 54,
	},
	logo: {
		marginTop: 35,
	},
	button_navigation: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 'auto',
	},
	button_rounded: {
		padding: 14,
		backgroundColor: '#39AAB4',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,

	},
	button: {
		backgroundColor: Colors.black.default,
		paddingHorizontal: 30,
		paddingVertical: 14,
		borderRadius: 10,
	},
	indicator_container: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	dot: {
		width: 4,
		height: 4,
		backgroundColor: Colors.gray.default,
		borderRadius: 8,
		marginHorizontal: 2.5,
	},
});

export default styles;
