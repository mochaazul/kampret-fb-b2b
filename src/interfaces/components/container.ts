import { ScrollView, StatusBarStyle } from 'react-native';
import HeaderInterface from './header';

interface IContainer extends React.ComponentProps<typeof ScrollView> {
	noPadding?: boolean | undefined,
	noPaddingTop?: boolean | undefined,
	noPaddingBottom?: boolean | undefined,
	noPaddingLeft?: boolean | undefined,
	noPaddingRight?: boolean | undefined,
	noPaddingVertical?: boolean | undefined,
	noPaddingHorizontal?: boolean | undefined,
	barStyle?: StatusBarStyle,
	noScroll?: boolean | undefined,
	header?: HeaderInterface;
	contentBackgroudColor?: string;
}

export default IContainer;
