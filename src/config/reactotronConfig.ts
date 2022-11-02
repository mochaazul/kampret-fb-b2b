// ReactotronConfig.js
import { reactotronRedux } from 'reactotron-redux';
import { Reactotron as Tron } from 'reactotron-core-client';
import Reactotron, { ReactotronReactNative } from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

// then add it to the plugin list
// Reactotron

declare global {
	interface Console {
		tron?: Tron<ReactotronReactNative> & ReactotronReactNative | undefined;
	}
}

const reactotron = Reactotron
	.setAsyncStorageHandler?.(AsyncStorage)
	.configure({ name: 'React Native Skeleton' })
	.useReactNative()
	.use(reactotronRedux()); //  <- here i am!

if (__DEV__) {
	reactotron?.connect(); // Don't forget about me!
}
reactotron?.clear?.();

export default reactotron;
// console.tron = reactotron;
