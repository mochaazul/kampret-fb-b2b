export default {
	GET_CONTACT: '/',
	GET_PROFILE: (id: string) => (`users/${ id }/profile`),
	LOGIN: 'v1/auth/login',
	OTP_REQUEST: '/v1/otp/login-request',
	OTP_VERIFY: '/v1/otp/login-verify',
	RESET_PASSWORD: '/v1/auth/update-password',
	FORGOT_OTP_REQUEST: '/v1/otp/forgot-password-request',
	FORGOT_OTP_VERIFY: '/v1/otp/forgot-password-verify'
};
