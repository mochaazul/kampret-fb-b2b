import { DeliveryInterface } from "@interfaces";

const items: Array<DeliveryInterface.IDeliveryItem> = [
	{
		id: 'SO0001-01',
		name: '5 Pack Rumput Laut',
		validated: false,
	},
	{
		id: 'SO0001-02',
		name: '5 Pack Daging Sapi',
		validated: false,
	},
	{
		id: 'SO0001-03',
		name: '5 Pack Daging Ikan',
		validated: false,
	},
	{
		id: 'SO0002-04',
		name: '5 Pack Daging Ikan',
		validated: false,
	},
	{
		id: 'SO0002-05',
		name: '5 Pack Daging Kambing',
		validated: false,
	},
];

const itemValidated = JSON.parse(JSON.stringify(items)) as Array<DeliveryInterface.IDeliveryItem>;
itemValidated.map((v) => v.validated = true);

const itemPartialValidated = JSON.parse(JSON.stringify(items)) as Array<DeliveryInterface.IDeliveryItem>;
itemPartialValidated.map((v, i) => { if (i < 3) v.validated = true; });

const customers: Array<DeliveryInterface.IDeliveryCustomer> = [
	{
		id: 'CID1234567899',
		custName: 'Sumorice',
		validated: false,
		numCart: 1,
		items: items,
		success: false,
	},
	{
		id: 'CID1234567890',
		custName: 'Sumorice',
		validated: true,
		numCart: 1,
		items: items,
		success: true,
	},
	{
		id: 'CID1234567891',
		custName: 'Sumorice',
		validated: true,
		numCart: 2,
		items: itemPartialValidated,
	},
	{
		id: 'CID1234567892',
		custName: 'Mangkokku',
		validated: true,
		numCart: 1,
		items: itemValidated,
	},
];

export const dummyDelivery: Array<DeliveryInterface.IDelivery> = [
	{
		id: 'DT123456',
		numLocation: 4,
		date: '29-09-2022, 07:00 - 12:00 WIB',
		status: 'new',
		customers: customers,
		totalItem: 15
	},
	{
		id: 'DT123457',
		numLocation: 4,
		date: '29-09-2022, 07:00 - 12:00 WIB',
		status: 'deliver',
		customers: customers,
		totalItem: 20
	},
];

export const dummyDeliveryHistory: Array<DeliveryInterface.IDeliveryHistory> = [
	{
		id: 'DT123456',
		date: '29-09-2022, 07:00 - 12:00 WIB',
		status: 'gagal',
		customers: customers,
		totalItem: 15,
		totalAccepted: 10,
		totalReturned: 5,
	},
	{
		id: 'DT123457',
		date: '29-09-2022, 07:00 - 12:00 WIB',
		status: 'selesai',
		customers: customers,
		totalItem: 20,
		totalAccepted: 18,
		totalReturned: 2,
	},
];