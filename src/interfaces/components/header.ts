/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { ViewComponent } from 'react-native';

interface IHeader extends React.ComponentProps<typeof ViewComponent> {
	title?: string;
	type?: 'main' | 'regular';
	rightButton?: string;
	onPressRightButton?: () => void;
}

export default IHeader;
