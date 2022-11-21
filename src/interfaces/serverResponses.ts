export type LOGIN = {
	token: string,
	user_id: number,
	user_role: string,
	user_name: string,
	user_phone: string,
	user_status: number,
	expiration_time: number;
};

export type OTP_REQUEST = {
	valid: boolean,
	expiry: number;
};