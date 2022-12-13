export type MiscState = {
	loading: boolean,
	deviceHeight: number,
	tmpImageUri?: string | null,
	notif?: boolean;
};

export type BE<T> = {
	data: T | null,
	pagination: any[],
	stat_code: string,
	stat_msg: string;
};