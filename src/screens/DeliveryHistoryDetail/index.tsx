import React, { } from "react";
import { Image, ScrollView, TextStyle, View } from "react-native";

import { Container, Input, Text } from "@components";
import { Colors, Fonts, Images } from "@constant";

import styles from "./styles";
import CheckItem, { CheckItemProp } from "../DeliveryCheck/CheckItem";

const DeliveryHistoryDetail = () => {

	const dummyItems: Array<CheckItemProp> = [
		{
			id: 'SO0001-01',
			name: '5 Pack Rumput Laut',
			complainAmount: '2 Pack',
			complainLabel: 'Barang Rusak',
			complainDesc: 'Lorem ipsum dolor sit amet consectetur. Vivamus facilisis risus morbi imperdiet diam fames vitae etiam. ',
			complainFiles: [
				<Images.Complain1 key={ 1 } />,
				<Images.Complain2 key={ 2 } />
			],
		},
		{
			id: 'SO0001-02',
			name: '5 Pack Daging Sapi',
		},
		{
			id: 'SO0001-03',
			name: '5 Pack Daging Ayam',
		},
		{
			id: 'SO0001-04',
			name: '5 Pack Daging Kambing',
		},
		{
			id: 'SO0001-05',
			name: '5 Pack Daging Unta',
		},
	];

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

					<View style={ { marginStart: 16 } }>

						<Text format={ Fonts.paragraph.m.bold as TextStyle } color={ Colors.black.default }>Sumorice</Text>
						<Text format={ Fonts.paragraph.m.regular as TextStyle } color={ Colors.gray.default }>Jl. Sultan Iskandar Muda No.6B, RT.7/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240</Text>
					</View>
				</View>

				<Text
					color={ Colors.gray.default }
					format={ Fonts.paragraph.xl.bold as TextStyle }
					style={ styles.label }
				>
					Pesanan
				</Text>

				{
					dummyItems.map((value: CheckItemProp, index: number) => {
						return (
							<View key={ 'item_' + index }>
								{ index > 0 && <View style={ { height: 10 } } /> }
								<CheckItem { ...value } />
							</View>
						);
					})
				}

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
						value="Susi Susanti"
						disabled
					/>

					<Image
						style={ styles.addImage }
						source={ require('../../assets/images/dummy_delivery_receiver.png') }
					/>

				</View>
			</ScrollView>
		</Container >
	);
};

export default DeliveryHistoryDetail;