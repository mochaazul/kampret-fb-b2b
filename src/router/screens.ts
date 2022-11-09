import {
	Auth, Contact, Delivery, Home, OnBoarding, Splash,
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
		name: 'Forgot',
		component: Auth.Forgot,
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
] as const;
