/**
 * @format
 */
 import 'react-native-reanimated'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import OneSignal from 'react-native-onesignal';
import env from './env';

// OneSignal Initialization
OneSignal.setAppId(env.oneSignal);

OneSignal.promptForPushNotificationsWithUserResponse();
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
	// console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
	let notification = notificationReceivedEvent.getNotification();
	// console.log("notification: ", notification);
	const data = notification.additionalData;
	// console.log("additionalData: ", data);
	// Complete with null means don't show a notification.
	notificationReceivedEvent.complete(notification);
});

AppRegistry.registerComponent(appName, () => App);
