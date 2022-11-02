import { ScrollView, StatusBarStyle } from 'react-native';

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
}

export default  IContainer;
