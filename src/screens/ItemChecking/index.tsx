import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, TextStyle, FlatList, ListRenderItem } from 'react-native';

import { Container, Text, Button } from '@components';
import { Fonts, Colors, Images } from '@constant';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { DeliveryInterface, NavigationProps } from '@interfaces';
import { Actions } from '@store';

import ItemChecklist from './ItemChecklist';
import { Item } from 'src/interfaces/deliveryResponses';

interface ItemTitle {
	label: string, qty: string;
};

type ItemType =
	{ type: 'TITLE', data: ItemTitle; } |
	{ type: 'ITEM', data: DeliveryInterface.IDeliveryItem; } |
	{ type: 'CART', data: DeliveryInterface.IDeliveryCart; } |
	{ type: 'SO', data: DeliveryInterface.IDeliverySO; }
	;

type ExtractItem<T extends ItemType['type']> = Extract<ItemType, { type: T; }>['data'];

;

type ATypeItem = {
	TITLE: ItemTitle;
	ITEM: DeliveryInterface.IDeliveryItem;
	CART: DeliveryInterface.IDeliveryCart;
	SO: DeliveryInterface.IDeliverySO;
};


const ItemChecking = ({ route }: NavigationProps<'ItemChecking'>) => {
	const [saved, setSaved] = useState<boolean>(false);
	const loading = useAppSelector(state => state.deliveryReducers.loadingClientItem);
	const loadingValidate = useAppSelector(state => state.deliveryReducers.loadingValidateClient);
	const resultValidate = useAppSelector(state => state.deliveryReducers.statusValidateItem);

	const listItems = useAppSelector(state => state.deliveryReducers.clientItems);

	const [currentItems, setCurrItemState] = useState<DeliveryInterface.IDeliveryItem[]>([]);
	const items = useMemo(() => {
		const res = listItems.filter(
			(item) => item.clientId == route.params?.clientId && item.deliveryId == route.params?.deliveryId
		);

		if (!currentItems.length) {
			setCurrItemState(JSON.parse(JSON.stringify(res)));
		}

		return res;
	}, [listItems]);

	const client = useAppSelector(state => state.deliveryReducers.clientValidation.find((client) => client.id == route.params?.clientId));
	const carts = useAppSelector(state => state.deliveryReducers.clientCarts.filter((cart) => cart.deliveryId == route.params?.deliveryId && cart.clientId == client?.id));

	const listSo = [
		{
			id: '889123122',
			deliveryId: route.params?.deliveryId,
			clientId: client?.id,
			name: 'Sales Order 1',
		},
		{
			id: '889123123',
			deliveryId: route.params?.deliveryId,
			clientId: client?.id,
			name: 'Sales Order 2',
		},
	];

	// generate list datas
	const listData = useMemo(() => {
		return [
			{
				id: 0,
				type: 'TITLE',
				data: { label: 'Item List', qty: `${ items.length } Barang` }
			},
			...items.map((item, index) => ({
				id: index + 1,
				type: 'ITEM',
				data: item
			})),

			{
				id: items.length + 1,
				type: 'TITLE',
				data: { label: 'Data Keranjang', qty: `${ carts.length } Keranjang` }
			},
			...carts.map((cart, index) => ({
				id: items.length + 2 + index,
				type: 'CART',
				data: cart
			})),

			{
				id: items.length + carts.length + 2,
				type: 'TITLE',
				data: { label: 'Data SO', qty: `${ listSo.length } Total SO` }
			},
			...listSo.map((SO, index) => ({
				id: index + items.length + carts.length + 3,
				type: 'SO',
				data: SO
			})),
		];
	}, [items, carts, listSo]);

	const getItem = useAppDispatch(Actions.deliveryAction.getClientItems);
	const setItem = useAppDispatch(Actions.deliveryAction.setItem);
	const validateItem = useAppDispatch(Actions.deliveryAction.validateItem);
	const validateBulk = useAppDispatch(Actions.deliveryAction.validateBulk);
	const setStatusValidateItem = useAppDispatch(Actions.deliveryAction.setStatusValidateItem);

	useEffect(() => {
		if (!items.length) {
			getItem({
				deliveryId: route.params?.deliveryId,
				clientId: route.params?.clientId
			});
		}

		return () => {
			if (!saved) setItem(currentItems);
		};
	}, []);

	useEffect(() => {
		if (resultValidate) {
			setSaved(true);
			setStatusValidateItem(false);
			NavigationHelper.pop(1);
		}
	}, [resultValidate]);

	const renderListDataItem = useMemo(() => {
		return (
			<FlatList
				data={ listData }
				keyExtractor={ (_item, index) => 'listItem_' + index }
				showsVerticalScrollIndicator={ false }
				renderItem={ ({ item }) => {
					switch (item.type) {
						case 'ITEM':
							return (
								<ItemChecklist
									item={ item.data as DeliveryInterface.IDeliveryItem }
									onCheckClicked={ (id) => validateItem(id) }
								/>
							);
						case 'CART':
							return (
								<DeliveryCart cart={ item.data as DeliveryInterface.IDeliveryCart } />
							);
						case 'SO':
							return (
								<DeliverySO so={ item.data as DeliveryInterface.IDeliverySO } />
							);
						case 'TITLE':
							const title = item.data as ItemTitle;
							return (
								<DeliveryItemTitle label={ title.label } qty={ title.qty } />
							);
						default:
							return null;
					}
				} }
				refreshing={ loading == true }
				onRefresh={ () => {
					setCurrItemState([]);
					getItem({
						deliveryId: route.params?.deliveryId,
						clientId: route.params?.clientId
					});
				} }
			/>
		);
	}, [listData]);

	const renderButton = useMemo(() => {
		if (currentItems.some(item => !item.validated)) {
			const itemHasChanged = JSON.stringify(items) != JSON.stringify(currentItems);
			return (
				<View style={ styles.footer }>
					<Images.ButtonCircleScan style={ { alignSelf: 'flex-end' } } />
					<Button
						mt={ 10 }
						weight='700'
						color={ Colors.white.pure }
						text='Selesai Pemeriksaan'
						onPress={ () => {
							if (!itemHasChanged)
								NavigationHelper.pop(1);
							else
								validateBulk({
									deliveryId: route.params?.deliveryId, clientId: route.params?.clientId
								});
						} }
						disabled={ !itemHasChanged }
						loading={ loadingValidate }
					/>
				</View>
			);
		}
	}, [items, currentItems, loadingValidate]);

	return (
		<Container
			header={ { title: 'Pemeriksaan Barang', type: 'regular' } }
			contentBackgroudColor={ Colors.white.pure }
			noPadding
			noScroll
			contentContainerStyle={ { paddingHorizontal: 0 } }
		>

			<View style={ [styles.row, styles.header] }>
				<View>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>{ client?.id }</Text>
					<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>{ client?.custName } </Text>
				</View>

				<View style={ styles.validateInfo }>
					<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.green.default }>Tervalidasi </Text>
					<Images.IconCheck />
				</View>

			</View>

			{ renderListDataItem }

			{ renderButton }
		</Container>
	);
};

export default ItemChecking;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 20,
		justifyContent: 'space-between'
	},
	validateInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	header: {
		justifyContent: 'space-between',
		paddingVertical: 20,
		backgroundColor: Colors.white.pure,
		borderTopColor: Colors.gray.line,
		borderTopWidth: 1,
	},
	title: {
		borderBottomColor: Colors.gray.line,
		borderBottomWidth: 1
	},
	item: {
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	footer: {
		bottom: 20,
		paddingHorizontal: 20,
	},
	separator: {
		height: 10,
		backgroundColor: Colors.white.background,
	}
});

interface DeliveryCartParams {
	cart: DeliveryInterface.IDeliveryCart;
}
const DeliveryCart = ({ cart }: DeliveryCartParams) => {
	return (
		<View style={ styles.item }>
			<Text format={ Fonts.textBody.l.bold as TextStyle } >Kode Keranjang: { cart.id }</Text>
			<Text format={ Fonts.textBody.m.regular as TextStyle } >Jumlah: { cart.qty }</Text>
		</View>
	);
};

interface DeliverySOParams {
	so: DeliveryInterface.IDeliverySO;
}
const DeliverySO = ({ so }: DeliverySOParams) => {
	return (
		<View style={ styles.item }>
			<Text format={ Fonts.textBody.l.bold as TextStyle } >{ so.name }</Text>
			<Text format={ Fonts.textBody.m.bold as TextStyle } >{ so.id }</Text>
		</View>
	);
};

interface DeliveryItemTitleParams {
	label: string, qty: string;
}
const DeliveryItemTitle = ({ label, qty }: DeliveryItemTitleParams) => {
	return (
		<>
			<View style={ styles.separator } />
			<View style={ [styles.row, styles.title] }>
				<Text format={ Fonts.textBody.l.bold as TextStyle } >{ label }</Text>
				<Text format={ Fonts.textBody.m.regular as TextStyle } >{ qty }</Text>
			</View>
		</>
	);
};