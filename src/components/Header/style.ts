import { Colors } from '@constant';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyle {
	row: ViewStyle;
	container: ViewStyle;
	regularHeader: ViewStyle;
}

export const styles = StyleSheet.create<IStyle>({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	container: {
		flex: 0,
		marginTop: 20
	},
	regularHeader: { flexDirection: 'row', justifyContent: 'space-between' }
});
