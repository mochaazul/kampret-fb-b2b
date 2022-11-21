import { Colors } from '@constant';
import { StyleSheet, ViewStyle } from 'react-native';

interface IStyle {
	defaultStyle: ViewStyle;
	loadingStyle: ViewStyle;
	shadowStyle: ViewStyle;
}
export const styles = StyleSheet.create<IStyle>({
	defaultStyle: {
		padding: 14,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingStyle: {
		alignSelf: 'flex-end',
		marginLeft: 10
	},
	shadowStyle: {
		shadowColor: '#000',
		shadowOffset: {
			width: -2,
			height: 4,
		},
		shadowOpacity: 0.04,
		shadowRadius: 4.65,
		elevation: 8,
	}
});
