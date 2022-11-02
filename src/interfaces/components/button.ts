import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface IButton extends React.ComponentProps<typeof TouchableOpacity> {
	text?: string | undefined;
	color?: string | undefined;
	weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
	textSize?: number | undefined;
	textStyle?: TextStyle;
	buttonStyle?: ViewStyle;
	circle?: boolean | undefined;
	backgroundColor?: string | undefined;
	width?: number | undefined;
	noPadding?: boolean | undefined;
	type?: 'solid' | 'outline' | undefined;
	mt?: number | undefined;
}

export default IButton;
