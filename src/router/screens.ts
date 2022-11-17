import {
	Auth,
	Contact,
	Delivery,
	Home,
	InputKms,
	Notification,
	OnBoarding,
	Splash,
	ValidateClientID,
	ItemChecking,
	DeliveryRoute,
	CapturePhoto,
	DeliveryCheck
} from '@screens';

export const screens = [
	{
		name: 'Splash',
		component: Splash,
	},
	{
		name: 'Home',
		component: Home,
	},
	{
		name: 'OnBoarding',
		component: OnBoarding,
	},
	{
		name: 'Login',
		component: Auth.Login,
	},
	{
		name: 'Register',
		component: Auth.Register,
	},
	{
		name: 'Contact',
		component: Contact,
	},
	{
		name: 'OTP',
		component: Auth.OTP,
	},
	{
		name: 'Reset',
		component: Auth.Reset,
	},
	{
		name: 'Delivery',
		component: Delivery,
	},
	{
		name: 'ValidateClientID',
		component: ValidateClientID,
	},
	{
		name: 'ItemChecking',
		component: ItemChecking,
	},
	{
		name: 'Notification',
		component: Notification,
	},
	{
		name: 'InputKms',
		component: InputKms,
	},
	{
		name: 'DeliveryRoute',
		component: DeliveryRoute,
	},
	{
		name: 'CapturePhoto',
		component: CapturePhoto,
	},
	{
		name: 'DeliveryCheck',
		component: DeliveryCheck,
	},
] as const;
