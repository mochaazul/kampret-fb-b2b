import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, TextStyle, FlatList } from 'react-native';

import { Container, Text, Button, Shimmer } from '@components';
import { Fonts, Colors, Images } from '@constant';
import { NavigationHelper, Ratio, useAppDispatch, useAppSelector } from '@helpers';
import { DeliveryInterface, NavigationProps } from '@interfaces';
import { Actions } from '@store';

import ItemChecklist from './ItemChecklist';

interface ItemTitle {
	label: string, qty: string;
};

const ItemChecking = ({ route }: NavigationProps<'ItemChecking'>) => {
	const [saved, setSaved] = useState<boolean>(false);
	const loading = useAppSelector(state => state.deliveryReducers.loadingClientItem);
	const loadingValidate = useAppSelector(state => state.deliveryReducers.loadingValidateItem);
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
	const listSo = useAppSelector(state => state.deliveryReducers.clientSos.filter((s) => s.deliveryId == route.params?.deliveryId && s.clientId == client?.id));

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
			...listSo.map((SO, index) => {
				SO.name = `Sales Order ${ index + 1 }`;
				return {
					id: index + items.length + carts.length + 3,
					type: 'SO',
					data: SO
				};
			}),
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

	interface IListItem { id: number, type: string, data: any; }
	const RenderItem = React.memo<IListItem>(
		item => {
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
		},
		(prev, next) => {
			let sameValidate = true;
			if (prev.type == 'ITEM' && next.type == 'ITEM') {
				const { validated: oldValidate } = (prev.data as DeliveryInterface.IDeliveryItem);
				const { validated: newValidate } = (next.data as DeliveryInterface.IDeliveryItem);
				sameValidate = oldValidate == newValidate;
			}

			return prev.id == next.id && prev.type == next.type && sameValidate;
		}
	);

	const renderListDataItem = useMemo(() => {
		// show loading state
		if (loading)
			return (
				<FlatList
					keyExtractor={ (_item, index) => index + '' }
					data={ Array(8).fill(0) }
					showsVerticalScrollIndicator={ false }
					renderItem={ ({ index }) => (
						<View key={ index } style={ { alignSelf: 'center' } }>
							<Shimmer animate={ true } active width={ Ratio.screenWidth - 48 } height={ 84 } />
						</View>
					) }
					ItemSeparatorComponent={ () => (<View style={ { height: 16 } } />) }
				/>
			);

		return (
			<FlatList
				data={ listData }
				keyExtractor={ (item) => `${ item.type }-${ item.id }` }
				showsVerticalScrollIndicator={ false }
				renderItem={ ({ item }) => <RenderItem { ...item } /> }
				refreshing={ false }
				onRefresh={ () => {
					setCurrItemState([]);
					getItem({
						deliveryId: route.params?.deliveryId,
						clientId: route.params?.clientId
					});
				} }
			/>
		);
	}, [listData, loading]);

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