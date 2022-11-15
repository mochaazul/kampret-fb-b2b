export interface IDeliveryItem {
	id: string;
	name: string | undefined;
	validated: boolean | undefined;
}

export interface IDeliveryCustomer {
	id: string;
	custName: string | undefined;
	validated: boolean | undefined;
	numCart: number | undefined;
	items: Array<IDeliveryItem> | undefined;
}

export interface IDelivery {
	id: string;
	customers: Array<IDeliveryCustomer> | undefined;
	numLocation: number | undefined;
	date: string | undefined;
	totalItem: number | undefined;
	status: 'new' | 'deliver' | undefined;
}