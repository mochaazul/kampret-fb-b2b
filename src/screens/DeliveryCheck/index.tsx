import { BottomSheet, Button, Container, Input, ModalDialog, Text } from "@components";
import { FormikProps, useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, ScrollView, TextStyle, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper, useAppDispatch, useAppSelector } from "@helpers";
import { Delivery } from "@validator";
import { Actions } from "@store";
import { NavigationProps } from '@interfaces';

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

const DeliveryCheck = ({ route }: NavigationProps<'DeliveryCheck'>) => {
	const [showComplain, setShowComplain] = useState<boolean>(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
	const [complainSetter, setComplainSetter] = useState<string | null>(null);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);

	const miscState = useAppSelector(state => state.miscReducers);
	const arrivalData = useAppSelector(state => state.deliveryReducers.clientArrivalData);
	const successArrival = useAppSelector(state => state.deliveryReducers.arrivalConfirmation);
	const arrivalLoading = useAppSelector(state => state.deliveryReducers.arrivalLoading);

	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);
	const setMultiplePhotoCapture = useAppDispatch(Actions.miscAction.setTmpMultiplePhotoCapture);
	const getArrivalData = useAppDispatch(Actions.deliveryAction.getClientArrivalData);
	const arrivalConfirmation = useAppDispatch(Actions.deliveryAction.arrivalConfirmation);
	const closeArrivalSuccessDialog = useAppDispatch(Actions.deliveryAction.closeSuccessArrivalConfirmationDialog);

	useEffect(() => {
		getArrivalData(route.params.deliveryId, route.params.clientId);
		return function () {
			setTmpImgUri('');
			setMultiplePhotoCapture(null);
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


	const mappingToCheckItemType: CheckItemProp[] = arrivalData && arrivalData.items ? arrivalData.items.map((item) => {
		return {
			id: item.sales_no + '-' + item.delivery_route_item_id,
			name: item.item_name,
			isComplain: item.complaint_description !== '',
			complainAmount: item.qty_reject + '',
			complainLabel: item.complaint_description,
			complainDesc: item.complaint_description,

		};
	})
		: [];

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
				{ arrivalData &&
					<View style={ styles.customerInfo }>
						<Images.IconLocation />

						<View style={ { marginStart: 16 } }>

							<Text format={ Fonts.paragraph.m.bold as TextStyle } color={ Colors.black.default }>{ arrivalData.client_name }</Text>
							<Text format={ Fonts.paragraph.m.regular as TextStyle } color={ Colors.gray.default }>{ arrivalData.client_address }</Text>
						</View>
					</View>
				}
				<Text
					color={ Colors.gray.default }
					format={ Fonts.paragraph.xl.bold as TextStyle }
					style={ styles.label }
				>
					Pesanan
				</Text>

				{
					mappingToCheckItemType.map((value: CheckItemProp, index: number) => {
						return (
							<View key={ 'item_' + index }>
								{ index > 0 && <View style={ { height: 10 } } /> }
								<CheckItem { ...value } onClickComplain={ () => setShowComplain(true) } />
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
						loading={ arrivalLoading }
					//disabled={ !formik.isValid }
					/>
				</View>
			</ScrollView>

			<ModalDialog visible={ successArrival !== null }
				onRequestClose={ () => closeArrivalSuccessDialog() }>
				<SuccessDeliveryDialog
					testBarcodeValue={ successArrival?.deliveryId }
					custName={ successArrival?.clientName }
					time={ successArrival?.time }
					onButtonPressed={ () => { closeArrivalSuccessDialog(); NavigationHelper.pop(1); } }
				/>
			</ModalDialog>

			<BottomSheet
				visible={ showComplain }
				onRequestClose={ () => setShowComplain(false) }
				noScroll
			>
				<Complain onClose={ () => setShowComplain(false) } deliveryRouteItemId={ complainSetter } />
			</BottomSheet>

			<BottomSheet
				visible={ showConfirm }
				onRequestClose={ () => setShowConfirm(false) }
				noScroll
			>
				<ConfirmArrival
					onClose={ () => setShowConfirm(false) }
					onConfirm={ () => {
						arrivalConfirmation({
							recipientName: formik.values.receiverName,
							imageUrl: formik.values.photoUri,
							deliveryId: route.params.deliveryId,
							clientId: route.params.clientId,
							clientName: arrivalData && arrivalData.client_name ? arrivalData.client_name : ''
						});
						setShowConfirm(false);
						setShowSuccessDialog(true);
					} }
				/>
			</BottomSheet>

		</Container >
	);
};

export default DeliveryCheck;