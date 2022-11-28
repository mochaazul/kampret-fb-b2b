import { Dimensions } from 'react-native';
import Colors from './colors';

const screenHeight = Dimensions.get('window').height;

const normalize = (fontSize: number, standardScreenHeight = 812) => {
	const heightPercent = (fontSize * screenHeight) / standardScreenHeight;
	return Math.round(heightPercent);

};
const settings = {
	primaryFont: {
		light: 'Ubuntu-Light',
		regular: 'Ubuntu-Regular',
		bold: 'Ubuntu-Bold',
		italic: 'Ubuntu-Italic',
		medium: 'Ubuntu-Medium',
	},

	secondaryFont: {
		light: 'Inter-Light',
		regular: 'Inter-Regular',
		semiBold: 'Inter-SemiBold',
		bold: 'Inter-Bold',
		extraBold: 'Inter-ExtraBold',
	},

	fontSize: {
		// xxs: normalize(9),
		xs: normalize(10),
		s: normalize(12),
		m: normalize(14),
		l: normalize(16),
		xl: normalize(20),
		// h6: normalize(20),
		// h5: normalize(22),
		// h4: normalize(24),
		h3: normalize(64),
		h2: normalize(75),
		// h1: normalize(96)
	},

	letterSpacing: 0.3,
};

const Fonts = {
	size: settings.fontSize,
	type: settings.primaryFont,
	paragraph: {
		xl: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: normalize(20),
				lineHeight: normalize(27),
				fontWeight: '700',
				color: Colors.black.default,
			},

			boldCenter: {
				fontFamily: settings.primaryFont.bold,
				fontSize: normalize(20),
				lineHeight: normalize(27),
				fontWeight: '700',
				color: Colors.black.default,
				textAlign: 'center',
			}

		},
		m: {
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(14),
				lineHeight: normalize(20),
				fontWeight: '400',
				color: Colors.black.default
			},

			regularCenter: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(14),
				lineHeight: normalize(20),
				fontWeight: '400',
				color: Colors.black.default,
				textAlign: 'center',
			},

			bold: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(14),
				lineHeight: normalize(20),
				fontWeight: '700',
				color: Colors.black.default
			},

		},
		s: {
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(12),
				lineHeight: normalize(18),
				fontWeight: '400',
				color: Colors.black.default
			},

			bold: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(12),
				lineHeight: normalize(18),
				fontWeight: '700',
				color: Colors.black.default
			}

		}
	},
	heading: {
		h2: {
			fontFamily: settings.primaryFont.regular,
			fontSize: normalize(24),
			lineHeight: normalize(28),
			fontWeight: '700',
			color: Colors.black.default
		},
		h3: {
			fontFamily: settings.primaryFont.regular,
			fontSize: normalize(20),
			lineHeight: normalize(23),
			fontWeight: '700',
			color: Colors.black.default
		}
	},
	textBody: {
		l: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: normalize(16),
				lineHeight: normalize(18),
				fontWeight: '700',
				color: Colors.black.default
			},

		},
		m: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: normalize(14),
				lineHeight: normalize(16),
				fontWeight: '700',
				color: Colors.black.default
			},
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(14),
				lineHeight: normalize(16),
				fontWeight: '400',
				color: Colors.black.default
			},

		},
		s: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: normalize(12),
				lineHeight: normalize(14),
				fontWeight: '700',
				color: Colors.black.default
			},
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(12),
				lineHeight: normalize(14),
				fontWeight: '400',
				color: Colors.black.default
			},

		},
		xs: {
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: normalize(10),
				lineHeight: normalize(11),
				fontWeight: '400',
				color: Colors.black.default
			},

		},
	}
};

export default Fonts

