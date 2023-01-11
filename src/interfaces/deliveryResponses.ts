export interface DeliveryListResponse {
	data: DeliveryListData[];
}

export interface DeliveryListClient {
	client_no: string,
	client_name: string,
}

export interface DeliveryListData {
	clients: DeliveryListClient[],
	date: string,
	delivery_id: number,
	delivery_no: string,
	total_item: number,
	status: number,
	total_client: number;
	item_order: number;
	item_receive: number;
	item_reject: number;
	text_status: string;
};

export interface DeliveryHistoryList {
	delivery_id: number;
	delivery_no: string;
	total_client: number;
	item_order: number;
	item_receive: number;
	item_reject: number;
	date: string;
	status: number;
	text_status: string;
}

export interface ClientDeliveryHistoryList {
	client_no: string;
	client_name: string;
	client_address: string;
	client_lat: number;
	client_long: number;
	frame_time: string;
	delivery_status: number;
	delivery_sequence: number;
	text_delivery_status: string;
	item_order: number;
	item_receive: number;
	item_reject: number;
	total_so: number;
}

export interface ClientDeliveryHistoryDetail {
	client_no: string;
	client_name: string;
	client_address: string;
	frame_time: string;
	receipt: Receipt;
	items: ClientDeliveryHistoryDetailItem[] | null;
	carts: Cart[];
}

interface ClientDeliveryHistoryDetailItem {
	complaint_notes: string;
	complaint_photos: null | string;
	item_name: string;
	qty_order: number;
	qty_reject: number;
	sales_no: string;
}

export interface Cart {
	cart_type: string;
	qty: number;
}

export interface Receipt {
	received_name: string;
	received_date: string;
	photo: string;
}

export interface DeliveryClientData {
	client_no: string;
	client_name: string;
	is_client_validate: boolean;
	total_item: number;
	total_item_validate: number;
	client_validate_date?: string;
	is_item_validate: boolean;
	item_validate_date?: string;
}

export interface DeliveryItemResp {
	client_no: string;
	client_name?: string;
	total_item: number;
	items: Array<DeliveryItemData>;
	carts: Array<DeliveryClientCartData>;
	sales_numbers: Array<string>;
}

export interface DeliveryClientCartData {
	cart_code?: string;
	cart_qty?: number;
}

export interface DeliveryItemData {
	sales_no?: string;
	sales_detail_id: string;
	name?: string;
	qty?: string;
	is_validate: boolean;
	validate_date: string;
}

export interface DeliveryProcessResp {
	data: DeliveryProcessData[];
}

export interface DeliveryProcessData {
	client_no: string;
	client_name: string;
	client_address: string;
	frame_time: string;
	delivery_status: number;
	delivery_sequence: number;
	text_delivery_status: string;
	item_order: number;
	client_lat: number;
	client_long: number;
}

export interface ClientArrivalResponse {
	client_no: string;
	client_name: string;
	client_address: string;
	client_lat: number;
	client_long: number;
	frame_time: string;
	total_so: number;
	receipt: Receipt;
	items: Item[];
	carts: Cart[];
}

export interface Cart {
	cart_type: string;
	qty: number;
}

export interface Item {
	delivery_route_item_id: number;
	item_name: string;
	sales_no: string;
	qty_order: number;
	qty_received: number;
	qty_reject: number;
	complain_date: Date;
	complaint_category: string;
	complaint_description: string;
	complaint_follow_up: string;
	complaint_images: string[] | null;
}

export interface Receipt {
	recipient_name: string;
	recipient_date: Date;
	recipient_photo: string;
}
