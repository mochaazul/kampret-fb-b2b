import { BottomSheet, Button, Container, Input, ModalDialog, Text } from "@components";
import { FormikProps, useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, ScrollView, TextStyle, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper, useAppDispatch, useAppSelector } from "@helpers";
import { Delivery } from "@validator";
import { Actions } from "@store";

import Complain from "../DeliveryRoute/Complain";
import CheckItem, { CheckItemProp } from "./CheckItem";
import ConfirmArrival from "./ConfirmArrival";
import SuccessDeliveryDialog from "./SuccessDeliveryDialog";

import styles from "./styles";

interface CheckValues {
	receiverName: string,
	photoUri: string,
	returnChecked: boolean;
}

const DeliveryCheck = () => {
	const [showComplain, setShowComplain] = useState<boolean>(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);

	const miscState = useAppSelector(state => state.miscReducers);

	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);

	useEffect(() => {
		return function () {
			setTmpImgUri('');
		};
	}, []);


	const formik: FormikProps<CheckValues> = useFormik<CheckValues>({
		validateOnBlur: true,
		validateOnChange: enableValidation,
		validationSchema: Delivery.DeliveryCheckValidationSchema,
		initialValues: {
			receiverName: '',
			photoUri: '',
			returnChecked: false,
		},
		onSubmit: () => { setShowConfirm(true); },
	});

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

	const navigateToCapturePhoto = useCallback(
		() => {
			NavigationHelper.push('CapturePhoto');
		},
		[],
	);

	const renderImage = useMemo(() => {
		if (miscState.tmpImageUri) {
			formik.setFieldValue('photoUri', miscState.tmpImageUri);
			return (
				<Image style={ styles.addImage } source={ { uri: miscState.tmpImageUri } } />
			);
		}

		return (
			<View style={ styles.addImage }>
				<Images.IconCamera />

				<Text
					format={ Fonts.textBody.l.bold as TextStyle }
					color={ Colors.gray.default }
					mt={ 20 }
				>
					+ Tambah Foto
				</Text>
			</View>
		);
	}, [miscState.tmpImageUri]);

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
						formik={ formik }
						name="receiverName"
						label="Nama Penerima"
					/>

					<TouchableOpacity
						activeOpacity={ .75 }
						onPress={ navigateToCapturePhoto }
					>
						{ renderImage }

					</TouchableOpacity>
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

						<TouchableOpacity
							onPress={ () => formik.setFieldValue('returnChecked', !formik.values['returnChecked']) }
						>
							{
								formik.values['returnChecked'] ?
									<Images.ButtonCheck2 /> :
									<Images.ButtonCheck />
							}
						</TouchableOpacity>
					</View>

					<Button
						text='Pengiriman Selesai'
						textSize={ 14 }
						weight='700'
						mt={ 30 }
						useShadow={ true }
						onPress={ () => { setEnableValidation(true); formik.handleSubmit(); } }
						disabled={ !formik.isValid }
					/>
				</View>
			</ScrollView>

			<ModalDialog visible={ showSuccessDialog }
				onRequestClose={ () => setShowSuccessDialog(false) }>
				<SuccessDeliveryDialog />
			</ModalDialog>

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
				<ConfirmArrival
					onClose={ () => setShowConfirm(false) }
					onConfirm={ () => {
						setShowConfirm(false);
						setShowSuccessDialog(true);
					} }
				/>
			</BottomSheet>

		</Container >
	);
};

export default DeliveryCheck;