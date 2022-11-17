
interface DeliveredItem {
	complain: number,
	receivedCount: number,
	totalDeliveredItem: number;
}
interface RouteTime {
	startAt: string,
	estEnd: string,
}

interface IRoute {
	locationTitle: string,
	locationAddress: string,
	locationTime: RouteTime,
	isDelivered?: DeliveredItem,
	isLastRoute?: boolean,
	totalItem?: number,
	disabled?: boolean,
	numbering: number;
	onClick?: () => void | undefined;
}

export default IRoute;