import React, { useEffect, useMemo } from "react";
import { Image, ScrollView, TextStyle, View } from "react-native";

import { Container, Input, Text } from "@components";
import { Colors, Fonts, Images } from "@constant";
import { NavigationProps } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

import styles from "./styles";
import CheckItem, { CheckItemProp } from "../DeliveryCheck/CheckItem";

const DeliveryHistoryDetail = ({ route }: NavigationProps<'DeliveryHistoryDetail'>) => {
	const deliveryHistoryDetail = useAppSelector(state => state.deliveryReducers.deliveryHistoryRouteDetail);
	const loading = useAppSelector(state => state.deliveryReducers.loadingList);

	const fetchList = useAppDispatch(Actions.deliveryAction.getDeliveryHistoryRouteDetail);

	useEffect(() => { fetchList(route.params.deliveryId, route.params.clientId); }, []);

	const memoizedHeader = useMemo(() => {
		if (deliveryHistoryDetail) {
			return (
				<View style={ { marginStart: 16 } }>
					<Text format={ Fonts.paragraph.m.bold as TextStyle } color={ Colors.black.default }>{ deliveryHistoryDetail.header.name }</Text>
					<Text format={ Fonts.paragraph.m.regular as TextStyle } color={ Colors.gray.default }>{ deliveryHistoryDetail.header.address }</Text>
				</View>
			);
		} else {
			return (
				<View />
			);
		}
	}, [deliveryHistoryDetail]
	);

	const memoizedItems = useMemo(() => {
		if (deliveryHistoryDetail?.item) {
			return deliveryHistoryDetail.item?.map((value: CheckItemProp, index: number) => {
				return (
					<View key={ 'item_' + index }>
						{ index > 0 && <View style={ { height: 10 } } /> }
						<CheckItem { ...value } />
					</View>
				);
			});
		} else {
			return (
				<View />
			);
		}
	}, [deliveryHistoryDetail]);
	return (
		<Container
			noPadding
			noScroll
			header={ {
				title: 'Detail Riwayat',
				type: 'regular'
			} }
			contentContainerStyle={ styles.container }
		>

			<ScrollView>
				<View style={ styles.customerInfo }>
					<Images.IconLocation />
					{ memoizedHeader }
				</View>

				<Text
					color={ Colors.gray.default }
					format={ Fonts.paragraph.xl.bold as TextStyle }
					style={ styles.label }
				>
					Pesanan
				</Text>

				{ memoizedItems }

				<Text
					color={ Colors.gray.default }
					format={ Fonts.paragraph.xl.bold as TextStyle }
					style={ styles.label }
				>
					Bukti Pesanan Diterima
				</Text>

				<View style={ styles.section }>
					<Input
						name="receiverName"
						label="Nama Penerima"
						value={ deliveryHistoryDetail ? deliveryHistoryDetail.receipt.name : '' }
						disabled
					/>

					<Image
						style={ styles.addImage }
						source={ deliveryHistoryDetail && deliveryHistoryDetail.receipt.photo !== '' ? { uri: deliveryHistoryDetail.receipt.photo } : require('../../assets/images/dummy_delivery_receiver.png') }
					/>

				</View>
			</ScrollView>
		</Container >
	);
};

export default DeliveryHistoryDetail;