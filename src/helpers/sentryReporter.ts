import * as Sentry from '@sentry/react-native';

const imageWatcher = (user: string, height: number, width: number) => {
	Sentry.captureException(user, {
		tags: {
			"image": height + 'x' + width
		}
	});
};

export default {
	imageWatcher
};