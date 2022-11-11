/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import thunk from 'redux-thunk';
import {
	applyMiddleware,
	legacy_createStore as createStore,
	combineReducers,
	compose,
} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

// import Reactotron from './reactotronConfig';
import { Reducers } from '../store';

const rootReducer = combineReducers({ ...Reducers });

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const enhancer:any = __DEV__ && Reactotron?.createEnhancer?.();

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

// const purgingState = async() => {
//   try {
//     await persistor.purge();
//   } catch (error) {
//     // alert('error purging state');
//   }
// };

// purgingState();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch | Dispatch<any>;
export { store, persistor };
