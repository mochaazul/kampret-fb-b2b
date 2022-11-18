export interface IDeliveryItem {
	id: string;
	name: string | undefined;
	validated: boolean | undefined;
	accepted?: boolean | undefined;
	returned?: boolean | undefined;
	complain?: string | undefined;
}

export interface IDeliveryCustomer {
	id: string;
	custName: string | undefined;
	validated: boolean | undefined;
	numCart: number | undefined;
	items: Array<IDeliveryItem> | undefined;
	address?: string;
	deliveryTime?: string;
	success?: boolean;
}

export interface IDelivery {
	id: string;
	customers: Array<IDeliveryCustomer> | undefined;
	numLocation: number | undefined;
	date: string | undefined;
	totalItem: number | undefined;
	status: 'new' | 'deliver' | undefined;
}

export interface IDeliveryHistory {
	id: string;
	customers: Array<IDeliveryCustomer> | undefined;
	status: 'selesai' | 'gagal' | undefined;
	date?: string;
	totalItem?: number;
	totalAccepted?: number;
	totalReturned?: number;
}