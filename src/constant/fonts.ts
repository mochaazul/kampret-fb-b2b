import { Ratio } from '../helpers';
// import { Colors } from '@constant';

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
		// xxs: Ratio.normalizeValue(9),
		xs: Ratio.normalizeValue(10),
		s: Ratio.normalizeValue(12),
		m: Ratio.normalizeValue(14),
		l: Ratio.normalizeValue(16),
		xl: Ratio.normalizeValue(20),
		// h6: Ratio.normalizeValue(20),
		// h5: Ratio.normalizeValue(22),
		// h4: Ratio.normalizeValue(24),
		h3: Ratio.normalizeValue(64),
		h2: Ratio.normalizeValue(75),
		// h1: Ratio.normalizeValue(96)
	},

	letterSpacing: 0.3,
};

export const Fonts = {
	size: settings.fontSize,
	type: settings.primaryFont,
	paragraph: {
		xl: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: Ratio.normalizeValue(20),
				lineHeight: Ratio.normalizeValue(27),
				fontWeight: '700',
				// color: Colors.black.default,
			}

		},
		m: {
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: Ratio.normalizeValue(14),
				lineHeight: Ratio.normalizeValue(20),
				fontWeight: '400',
				// color: Colors.black.default
			}

		},
		s: {
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: Ratio.normalizeValue(12),
				lineHeight: Ratio.normalizeValue(18),
				fontWeight: '400',
				// color: Colors.black.default
			}

		}
	},
	heading: {
		h2: {
			fontFamily: settings.primaryFont.regular,
			fontSize: Ratio.normalizeValue(24),
			lineHeight: Ratio.normalizeValue(28),
			fontWeight: '700',
			// color: Colors.black.default
		},
		h3: {
			fontFamily: settings.primaryFont.regular,
			fontSize: Ratio.normalizeValue(20),
			lineHeight: Ratio.normalizeValue(23),
			fontWeight: '700',
			// color: Colors.black.default
		}
	},
	textBody: {
		l: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: Ratio.normalizeValue(16),
				lineHeight: Ratio.normalizeValue(18),
				fontWeight: '700',
				// color: Colors.black.default
			},

		},
		m: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: Ratio.normalizeValue(14),
				lineHeight: Ratio.normalizeValue(16),
				fontWeight: '700',
				// color: Colors.black.default
			},
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: Ratio.normalizeValue(14),
				lineHeight: Ratio.normalizeValue(16),
				fontWeight: '700',
				// color: Colors.black.default
			},

		},
		s: {
			bold: {
				fontFamily: settings.primaryFont.bold,
				fontSize: Ratio.normalizeValue(12),
				lineHeight: Ratio.normalizeValue(14),
				fontWeight: '700',
				// color: Colors.black.default
			},
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: Ratio.normalizeValue(12),
				lineHeight: Ratio.normalizeValue(14),
				fontWeight: '700',
				// color: Colors.black.default
			},

		},
		xs: {
			regular: {
				fontFamily: settings.primaryFont.regular,
				fontSize: Ratio.normalizeValue(10),
				lineHeight: Ratio.normalizeValue(11),
				fontWeight: '400',
				// color: Colors.black.default
			},

		},
	}
};

