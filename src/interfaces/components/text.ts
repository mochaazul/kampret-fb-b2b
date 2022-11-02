import { Text } from 'react-native';

interface IText extends React.ComponentProps<typeof Text>  {
	color?: string | undefined;
	weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
	size?: number | undefined;
	lineHeight?: number | undefined;
	mt?: number | undefined;
	align?: 'center' | 'left' | 'right',
}

export default IText;
