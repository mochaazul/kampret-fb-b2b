import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, TextStyle, FlatList } from 'react-native';

import { Container, Text, Button } from '@components';
import { Fonts, Colors, Images } from '@constant';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { NavigationProps } from '@interfaces';
import { Actions } from '@store';

import ItemChecklist from './ItemChecklist';

const ItemChecking = ({ route }: NavigationProps<'ItemChecking'>) => {
	const [saved, setSaved] = useState<boolean>(false);
	const loading = useAppSelector(state => state.deliveryReducers.loadingClientItem);
	const loadingValidate = useAppSelector(state => state.deliveryReducers.loadingValidateClient);
	const resultValidate = useAppSelector(state => state.deliveryReducers.statusValidateItem);

	const listItems = useAppSelector(state => state.deliveryReducers.clientItems);
	const items = useMemo(() => {
		return listItems.filter(
			(item) => item.clientId == route.params?.clientId && item.deliveryId == route.params?.deliveryId
		);
	}, [listItems]);
	const currentItems = [...items];

	const client = useAppSelector(state => state.deliveryReducers.clientValidation.find((client) => client.id == route.params?.clientId));

	const getItem = useAppDispatch(Actions.deliveryAction.getClientItems);
	const setItem = useAppDispatch(Actions.deliveryAction.setItem);
	const validateItem = useAppDispatch(Actions.deliveryAction.validateItem);
	const validateBulk = useAppDispatch(Actions.deliveryAction.validateBulk);
	const setStatusValidateItem = useAppDispatch(Actions.deliveryAction.setStatusValidateItem);

	useEffect(() => {
		if (!items.length)
			getItem({
				deliveryId: route.params?.deliveryId,
				clientId: route.params?.clientId
			});

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

	const renderListItem = useMemo(() => {
		return (
			<FlatList
				data={ items }
				extraData={ items }
				keyExtractor={ (_item, index) => 'listItem_' + index }
				showsVerticalScrollIndicator={ false }
				renderItem={ ({ item, index }) =>
				(
					<ItemChecklist
						item={ item }
						onCheckClicked={ (id) => validateItem(id) }
					/>)
				}
				refreshing={ loading == true }
				onRefresh={ () => getItem({
					deliveryId: route.params?.deliveryId,
					clientId: route.params?.clientId
				}) }
			/>
		);
	}, [items, loading]);

	const renderButton = useMemo(() => (
		<Button
			mt={ 10 }
			weight='700'
			color={ Colors.white.pure }
			text='Selesai Pemeriksaan'
			onPress={ () => validateBulk({
				deliveryId: route.params?.deliveryId, clientId: route.params?.clientId
			}) }
			disabled={ !(items.some((item) => item.validated)) }
			loading={ loadingValidate }
		/>
	), [items, loadingValidate]);

	return (
		<Container
			header={ { title: 'Pemeriksaan Barang', type: 'regular' } }
			contentBackgroudColor={ Colors.white.pure }
			noPadding
			noScroll
		>

			<View style={ [styles.row, styles.header] }>
				<View>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>{ client?.id }</Text>
					<View style={ styles.row }>
						<Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 }>{ client?.custName } </Text>
						{/* <Text format={ Fonts.textBody.m.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>| 2 Keranjang</Text> */ }
					</View>

				</View>
				<View style={ styles.row }>
					<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.green.default }>Tervalidasi </Text>
					<Images.IconCheck />
				</View>
			</View>

			{ renderListItem }

			<View style={ styles.footer }>
				<Images.ButtonCircleScan style={ { alignSelf: 'flex-end' } } />

				{ renderButton }
			</View>
		</Container>
	);
};

export default ItemChecking;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	header: {
		justifyContent: 'space-between',
		paddingVertical: 20,
		backgroundColor: Colors.white.pure,
		borderTopColor: Colors.gray.line,
		borderTopWidth: 1,
	},
	footer: {
		bottom: 20
	}
});