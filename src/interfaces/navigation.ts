import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CameraPreset } from 'react-native-vision-camera';
import { ComplainItemParams } from 'src/screens/DeliveryCheck/ComplainItem';
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
		deliveryLocation?: string;
	};
	DeliveryRoute?: {
		deliveryId?: string;
	};
	CapturePhoto?: {
		customStore?: {
			id: string,
			currentStore: MultiplePhotoCapture | null,
		};
		cameraPreest?: CameraPreset,
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
	ScanBarcode?: {
		deliveryId: string;
	};
	ComplainItem?: ComplainItemParams;
};
