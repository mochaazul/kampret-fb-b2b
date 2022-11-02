import { StyleSheet, ViewStyle } from 'react-native';

interface ICustomStyles extends ViewStyle {
  defaultStyle: (
    noPadding?: boolean | undefined,
    noPaddingTop?: boolean | undefined,
    noPaddingBottom?: boolean | undefined,
    noPaddingLeft?: boolean | undefined,
    noPaddingRight?: boolean | undefined,
    noPaddingVertical?: boolean | undefined,
    noPaddingHorizontal?: boolean | undefined,
  ) => ViewStyle
}

const customStyle: ICustomStyles = {
	defaultStyle: (
		noPadding,
		noPaddingTop,
		noPaddingBottom,
		noPaddingLeft,
		noPaddingRight,
		noPaddingVertical,
		noPaddingHorizontal,
	) => {
		let paddingTop = 30;
		let paddingBottom = 30;
		let paddingLeft = 30;
		let paddingRight = 30;

		if (noPaddingTop) {
			paddingTop = 0;
		}

		if (noPaddingBottom) {
			paddingBottom = 0;
		}

		if (noPaddingLeft) {
			paddingLeft = 0;
		}

		if (noPaddingRight) {
			paddingRight = 0;
		}

		if (noPaddingVertical) {
			paddingTop = 0;
			paddingBottom = 0;
		}

		if (noPaddingHorizontal) {
			paddingRight = 0;
			paddingLeft = 0;
		}
		if (noPadding) {
			paddingTop = 0;
			paddingBottom = 0;
			paddingLeft = 0;
			paddingRight = 0;
		}
		return {
			paddingTop: paddingTop,
			paddingBottom: paddingBottom,
			paddingLeft: paddingLeft,
			paddingRight: paddingRight,
			flex: 1,
		};
	},
};

export const styles = StyleSheet.create({
	customStyle,
});
