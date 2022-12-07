export interface DeliveryState {
	deliveryList: Array<IDelivery>;
	loadingList: boolean | undefined;

	clientValidation: Array<IDeliveryCustomer>;
	loadingClient: boolean | undefined;
	loadingValidateClient: boolean | undefined;
	resultValidateClient: boolean | undefined;

	clientItems: Array<IDeliveryItem>;
	loadingClientItem: boolean | undefined;
	loadingValidateItem: boolean | undefined;
	statusValidateItem: boolean | undefined;
}

export interface IDeliveryItem {
	id: string;
	orderId: string;
	name: string | undefined;
	qty: string;
	validated: boolean | undefined;
	validatedTime?: string | undefined;
	deliveryId: string;
	clientId: string;
	accepted?: boolean | undefined;
	returned?: boolean | undefined;
	complain?: string | undefined;
}

export interface IDeliveryCustomer {
	id: string;
	deliveryId: string;
	custName: string | undefined;
	validated: boolean | undefined;
	numCart?: number | undefined;
	numItem?: number | undefined;
	numValidated?: number | undefined;
	items?: Array<IDeliveryItem> | undefined;
	address?: string;
	deliveryTime?: string;
	success?: boolean;
}

export interface IClientValidation {
	deliveryId: string;
	clientId: string;
	isValidated: boolean;
}

export interface IDeliveryClientParams {
	deliveryId: string;
	clientId: string;
}

export interface IDelivery {
	id: string;
	customers: Array<IDeliveryCustomer> | undefined;
	numLocation: number | undefined;
	date: string | undefined;
	totalItem: number | undefined;
	status: string | 'new' | 'deliver' | undefined;
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