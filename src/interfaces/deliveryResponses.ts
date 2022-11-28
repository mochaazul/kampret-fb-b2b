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