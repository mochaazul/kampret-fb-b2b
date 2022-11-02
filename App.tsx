import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import { AppRouter } from '@router';
import { ReduxConfig } from '@config';
import { MyToast } from '@components';

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

export default App;
