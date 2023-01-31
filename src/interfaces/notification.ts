export type NotificationState = {
	loading: boolean,
	notification: notificationData | null,
	next: string | null,
	prev: string | null,
	latestNotifReaded: number;
};

export interface notificationData {
	not_read_count: number;
	notifications: Notification[];
}

export interface Notification {
	id: number;
	category: string;
	title: string;
	detail: string;
	user_id: number;
	role: string;
	date: Date;
	is_read: boolean;
	read_date: Date;
}