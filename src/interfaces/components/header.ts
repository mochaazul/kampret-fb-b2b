/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { ViewComponent, ViewStyle } from 'react-native';

interface IHeader extends React.ComponentProps<typeof ViewComponent> {
	title?: string;
	type?: 'main' | 'regular';
	rightButton?: string;
	headerStyle?: ViewStyle;
	onPressRightButton?: () => void;
}

export default IHeader;
