import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
	Delivery?: undefined;
	ValidateClientID?: {
		deliveryId?: string;
	};
	ItemChecking?: {
		deliveryId?: string;
		clientId?: string;
	};
	InputKms?: {
		photo?: string;
	};
	DeliveryRoute?: undefined;
	CapturePhoto?: undefined;
};
