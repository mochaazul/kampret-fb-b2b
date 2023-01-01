import { IRoute } from "./components";
import { CheckItemProp } from '../screens/DeliveryCheck/CheckItem';
import { ClientArrivalResponse } from './deliveryResponses';
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

	loadingInputKm: boolean | undefined;
	statusInputKm: boolean | undefined;
	deliveryHistory: Array<IDeliveryHistory> | undefined;
	deliveryHistoryRoute: Array<IRoute> | undefined;
	deliveryHistoryRouteDetail: IHistoryDetail | undefined;

	loadingDeliveryProcess: boolean | undefined;
	loadingStartDeliveryClient: boolean | undefined;

	clientArrivalData: ClientArrivalResponse | null;
	arrivalConfirmation: IDeliverySuccess | null;
	arrivalLoading: boolean;
}

export interface IDeliverySuccess {
	deliveryId: string,
	clientName: string,
	time: string;
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
	status?: number | undefined;
	sequence?: number | undefined;
	statusLabel?: string | undefined;
	latitude?: number | undefined;
	longitude?: number | undefined;
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

export interface IInputKmParams {
	deliveryId: string;
	lat: string;
	long: string;
	odo: string;
	location?: string;
	imageUrl?: string;
}

export interface IArrivalConfirmation {
	imageUrl?: string;
	recipientName: string;
	deliveryId: string;
	clientId: string;
	clientName: string;
}

export interface IDelivery {
	id: string;
	label: string;
	customers: Array<IDeliveryCustomer> | undefined;
	numLocation: number | undefined;
	date: string | undefined;
	totalItem: number | undefined;
	status: string | 'new' | 'deliver' | undefined;
}

export interface IDeliveryHistory {
	id: number;
	customers: Array<IDeliveryCustomer> | undefined;
	status: 'selesai' | 'gagal' | undefined;
	date?: string;
	totalItem?: number;
	totalAccepted?: number;
	totalReturned?: number;
}

interface HistoryDetailHeader {
	clientId: string,
	address: string,
	name: string,
	time: string;
}
interface HistoryDetailReceipt {
	name: string,
	date: string,
	photo: string;
}
export interface IHistoryDetail {
	header: HistoryDetailHeader,
	item: CheckItemProp[] | null,
	receipt: HistoryDetailReceipt;
}

export interface IDeliveryFinish {
	finishLocation: string,
	finishOdometer_image: string,
	deliveryId: string;
}

export interface IAddComplainDelivery {
	deliveryId: string,
	clientId: string,
	complaintDescription: string,
	complainImageUrl: string;
}