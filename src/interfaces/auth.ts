import { LOGIN as LOGIN_SUCCESS_RESPONSE } from './serverResponses';

export type AuthState = {
	loading: boolean,
	user: LOGIN_SUCCESS_RESPONSE | null;
};

export type loginPayload = {
	username: string,
	password: string,
	confirm_password: string;
};

export type requestOTP = {
	phone: string;
};

export type verifyOTP = {
	phone: string,
	otp_code: string;
};

export type resetPassword = {
	password: string,
	confirm_password: string;
};