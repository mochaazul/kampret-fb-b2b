export type MiscState = {
	loading: boolean,
	deviceHeight: number,
	tmpImageUri?: string | null,
};

export type BE<T> = {
	data: T | object | null,
	pagination: any[],
	stat_code: string,
	stat_msg: string;
};