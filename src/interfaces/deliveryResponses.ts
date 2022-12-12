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
	total_item: number,
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

export interface DeliveryClientData {
	client_no: string;
	client_name: string;
	is_client_validate: boolean;
	total_item: number;
	client_validate_date?: string;
	is_item_validate: boolean;
	item_validate_date?: string;
}

export interface DeliveryItemResp {
	client_no: string;
	client_name?: string;
	total_item: number;
	items: Array<DeliveryItemData>;
}

export interface DeliveryItemData {
	sales_no?: string;
	sales_detail_id: string;
	name?: string;
	qty?: string;
	is_validate: boolean;
	validate_date: string;
}