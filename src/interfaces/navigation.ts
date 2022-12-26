import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MultiplePhotoCapture } from './misc';

export type NavigationProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
	Splash?: {};
	Home?: undefined;
	OnBoarding?: undefined;
	Login?: undefined;
	Register?: undefined;
	Contact?: undefined;
	OTP?: {
		phoneNumber: string,
		authType: 'login' | 'reset';
	};
	Reset?: undefined;
	Delivery?: {
		notif?: boolean;
	};
	ValidateClientID?: {
		deliveryId?: string;
	};
	ItemChecking?: {
		deliveryId?: string;
		clientId?: string;
	};
	InputKms?: {
		photo?: string;
		deliveryId?: string;
	};
	DeliveryRoute?: {
		deliveryId?: string;
	};
	CapturePhoto?: {
		customStore?: {
			id: string,
			currentStore: MultiplePhotoCapture | null,
		};
	};
	Notification?: {
		item: any;
	};
	DeliveryRouteHistory: {
		deliveryId: string;
	};
	DeliveryHistoryDetail: {
		deliveryId?: string;
		clientId?: string;
	};
	DeliveryCheck: {
		deliveryId?: string;
		clientId?: string;
	};
};
