import { BottomSheet, Button, Container, Input, Text } from "@components";
import { Colors, Fonts, Images } from "@constant";
import React, { useState } from "react";
import { FlatList, ScrollView, TextStyle, View } from "react-native";
import Complain from "../DeliveryRoute/Complain";
import CheckItem, { CheckItemProp } from "./CheckItem";
import ConfirmArrival from "./ConfirmArrival";

import styles from "./styles";

const DeliveryCheck = () => {
	const [showComplain, setShowComplain] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	const dummyItems: Array<CheckItemProp> = [
		{
			id: 'SO0001-01',
			name: '5 Pack Rumput Laut',
			isComplain: true,
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
			isComplain: false,
			onClickComplain: () => setShowComplain(true),
		},
		{
			id: 'SO0001-03',
			name: '5 Pack Daging Ayam',
			isComplain: false,
			onClickComplain: () => setShowComplain(true),
		},
		{
			id: 'SO0001-04',
			name: '5 Pack Daging Kambing',
			isComplain: false,
			onClickComplain: () => setShowComplain(true),
		},
		{
			id: 'SO0001-05',
			name: '5 Pack Daging Unta',
			isComplain: false,
			onClickComplain: () => setShowComplain(true),
		},
	];

	return (
		<Container
			noPadding
			noScroll
			header={ {
				title: 'Cek Pengiriman',
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

				<FlatList
					data={ dummyItems }
					renderItem={ ({ item }) => <CheckItem { ...item } /> }
					ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
					style={ { flexGrow: 0 } }
				/>

				<Text
					color={ Colors.gray.default }
					format={ Fonts.paragraph.xl.bold as TextStyle }
					style={ styles.label }
				>
					Bukti Pesanan Diterima
				</Text>

				<View style={ styles.section }>
					<Input
						name="penerima"
						label="Nama Penerima"
					/>
				</View>

				<Text
					color={ Colors.gray.default }
					format={ Fonts.paragraph.xl.bold as TextStyle }
					style={ styles.label }
				>
					Barang Yang Harus Dibawa Kembali
				</Text>

				<View style={ styles.section }>
					<View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
						<Text
							format={ Fonts.paragraph.xl.bold as TextStyle }
							color={ Colors.black.default }
						>
							2 Keranjang Merah
						</Text>

						<Images.ButtonCheck2 />
					</View>

					<Button
						text='Pengiriman Selesai'
						textSize={ 14 }
						weight='700'
						mt={ 30 }
						useShadow={ true }
						onPress={ () => setShowConfirm(true) }
					/>
				</View>
			</ScrollView>

			<BottomSheet
				visible={ showComplain }
				onRequestClose={ () => setShowComplain(false) }
				noScroll
			>
				<Complain onClose={ () => setShowComplain(false) } />
			</BottomSheet>

			<BottomSheet
				visible={ showConfirm }
				onRequestClose={ () => setShowConfirm(false) }
				noScroll
			>
				<ConfirmArrival onClose={ () => setShowConfirm(false) } />
			</BottomSheet>

		</Container >
	);
};

export default DeliveryCheck;