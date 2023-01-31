import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

import { AppRouter } from '@router';
import { ReduxConfig } from '@config';
import { MyToast } from '@components';
import './src/translations';

const CODE_PUSH_OPTIONS = { checkFrequency: codePush.CheckFrequency.MANUAL };

const App = () => {
	return (
		<Provider store={ ReduxConfig.store }>
			<PersistGate
				loading={ null }
				persistor={ ReduxConfig.persistor }>
				<AppRouter />
				<Toast
					position='bottom'
					config={ MyToast } />
			</PersistGate>
		</Provider>
	);
};

export default codePush(CODE_PUSH_OPTIONS)(Sentry.wrap(App));
