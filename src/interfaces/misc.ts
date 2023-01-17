export type MiscState = {
	loading: boolean,
	deviceHeight: number,
	tmpImageUri?: string | null,
	notif?: boolean,
	locationStatus: 'loading' | 'success' | 'failed',
	currentLatitude: number | undefined,
	currentLongitude: number | undefined,
	tmpMultiplePhotoCaptures: MultiplePhotoCapture | null;
	deliveryIssueTitle: string;
	deliveryIssueDesc: string;
	tmpDeliveryComplainResult: string | null;
	uploadProgress: UploadProgress | undefined;
};

export type UploadProgress = {
	loaded: number,
	total: number;
};

export type BE<T> = {
	data: T | null,
	pagination: any[],
	stat_code: string,
	stat_msg: string;
};

export type MultiplePhotoCapture = { [id: string]: string; };