import { BottomSheet, Button, Container, Input, ModalDialog, Text } from "@components";
import { FormikProps, useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, ScrollView, TextStyle, TouchableOpacity, View, FlatList } from "react-native";

import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper, useAppDispatch, useAppSelector } from "@helpers";
import { Delivery } from "@validator";
import { Actions } from "@store";
import { NavigationProps, DeliveryInterface, DeliveryResponseInterface } from '@interfaces';

import Complain from "../DeliveryRoute/Complain";
import ConfirmItem from "./ConfirmItem";
import CheckItem, { CheckItemProp } from "./CheckItem";
import ConfirmArrival from "./ConfirmArrival";
import SuccessDeliveryDialog from "./SuccessDeliveryDialog";

import styles from "./styles";

interface CheckValues {
	receiverName: string,
	photoUri: string,
	// returnChecked: Array<string>;
}

const DeliveryCheck = ({ route, navigation }: NavigationProps<'DeliveryCheck'>) => {
	const [showComplain, setShowComplain] = useState<DeliveryInterface.IComplainDialogProps | null>(null);
	const [showConfirmItem, setShowConfirmItem] = useState<DeliveryInterface.IComplainDialogProps | null>(null);
	const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
	const [complainSetter, setComplainSetter] = useState<string | null>(null);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [listCartReturned, setListCartReturned] = useState<Array<string>>([]);

	const miscState = useAppSelector(state => state.miscReducers);
	const arrivalData = useAppSelector(state => state.deliveryReducers.clientArrivalData);
	const successArrival = useAppSelector(state => state.deliveryReducers.arrivalConfirmation);
	const arrivalLoading = useAppSelector(state => state.deliveryReducers.arrivalLoading);
	const apiComplainResult = useAppSelector(state => state.miscReducers.tmpDeliveryComplainResult);

	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);
	const setMultiplePhotoCapture = useAppDispatch(Actions.miscAction.setTmpMultiplePhotoCapture);
	const getArrivalData = useAppDispatch(Actions.deliveryAction.getClientArrivalData);
	const arrivalConfirmation = useAppDispatch(Actions.deliveryAction.arrivalConfirmation);
	const closeArrivalSuccessDialog = useAppDispatch(Actions.deliveryAction.closeSuccessArrivalConfirmationDialog);
	const setApiComplainResult = useAppDispatch(Actions.miscAction.setDeliveryComplainResult);

	useEffect(() => {

		getArrivalData(route.params.deliveryId, route.params.clientId);

		return function () {
			setTmpImgUri('');
			setMultiplePhotoCapture(null);
		};
	}, []);

	//watcher to hide bottomSheet after receive api response
	useEffect(() => {
		if (apiComplainResult) {
			getArrivalData(route.params.deliveryId, route.params.clientId);
			setShowComplain(null);
			setApiComplainResult(null);
		}
	}, [apiComplainResult]);

	// listen to arrivalData state
	useEffect(() => {
		// generate formik returnChecked values with array of empty strings
		setListCartReturned(
			Array.from({ length: arrivalData?.carts?.length ?? 0 }, () => '')
		);
	}, [arrivalData]);

	const formik: FormikProps<CheckValues> = useFormik<CheckValues>({
		validateOnBlur: true,
		// validateOnChange: enableValidation,
		validationSchema: Delivery.DeliveryCheckValidationSchema,
		initialValues: {
			receiverName: '',
			photoUri: '',
			// returnChecked: [],
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

	const mappingItem = (arrive: DeliveryResponseInterface.ClientArrivalResponse | null) => {

		if (arrive && arrive.items) {
			return arrive.items.map((item) => {
				return {
					id: item.sales_no + '-' + item.delivery_route_item_id,
					name: item.item_name,
					isComplain: item.complaint_description !== '',
					complainAmount: item.qty_reject + '',
					complainLabel: item.complaint_description,
					complainDesc: item.complaint_description,
					existingComplain: item.complaint_description ? {
						category: item.complaint_category,
						description: item.complaint_description,
						qty: item.qty_reject,
						imageUrl: item.complaint_images,
						followUp: item.complaint_follow_up
					} : undefined

				};
			});
		} else {
			return [];
		}
	};

	const renderCart = (checked: boolean, name: string, qty: number, idx: number) => (
		<View style={ { flexDirection: 'row', alignContent: 'center', alignItems: 'center' } }>
			<TouchableOpacity
				onPress={ () => {
					const newValue = [...listCartReturned];
					newValue[idx] = checked ? '' : name;
					setListCartReturned(newValue);
				} }
			>
				{
					checked ?
						<Images.ButtonCheck2 width={ 28 } height={ 28 } /> :
						<Images.ButtonCheck width={ 28 } height={ 28 } />
				}
			</TouchableOpacity>

			<Text
				format={ Fonts.textBody.l.regular as TextStyle }
				color={ Colors.black.default }
				style={ { marginStart: 12 } }
			>
				{ `${ name } - ${ qty } Keranjang` }
			</Text>
		</View>
	);

	const renderListCart = useMemo(() => (
		<FlatList
			data={ arrivalData?.carts }
			keyExtractor={ (_item, index) => 'item_' + index }
			renderItem={
				({ item, index }) => renderCart(
					listCartReturned[index] != '', item.cart_code, item.cart_qty, index
				)
			}
			ItemSeparatorComponent={ () => (<View style={ { height: 15 } } />) }
			scrollEnabled={ false }
		/>
	), [arrivalData?.carts, listCartReturned]);

	return (
		<Container
			noPadding
			noScroll
			header={ {
				title: 'Cek Serah Terima',
				type: 'regular'
			} }
			contentContainerStyle={ styles.container }
		>

			<FlatList
				nestedScrollEnabled={ false }
				data={ mappingItem(arrivalData) as CheckItemProp[] }
				keyExtractor={ (_item, index) => 'item_' + index }
				extraData={ arrivalLoading }
				showsVerticalScrollIndicator={ false }
				ListHeaderComponent={ () => {
					return (
						<View>
							{ arrivalData &&
								<View style={ styles.customerInfo }>
									<Images.IconLocation style={ { marginTop: 4 } } />

									<View style={ { marginStart: 16 } }>

										<Text format={ Fonts.paragraph.l.bold as TextStyle } color={ Colors.black.default }>{ arrivalData.client_name }</Text>
										<Text format={ Fonts.paragraph.m.regular as TextStyle } color={ Colors.gray.default } style={ { marginTop: 10 } }>{ arrivalData.client_address }</Text>
									</View>
								</View>
							}
							<View style={ styles.separator } />
							<Text
								color={ Colors.black.default }
								format={ Fonts.paragraph.l.bold as TextStyle }
								style={ styles.label }
							>
								Pesanan
							</Text>
						</View>
					);
				}
				}
				ListFooterComponent={ () => {
					return (
						<View>
							<View style={ styles.separator } />
							<Text
								color={ Colors.black.default }
								format={ Fonts.paragraph.l.bold as TextStyle }
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

							<View style={ styles.separator } />
							<Text
								color={ Colors.black.default }
								format={ Fonts.paragraph.l.bold as TextStyle }
								style={ styles.label }
							>
								Barang Yang Harus Dibawa Kembali
							</Text>

							<View style={ styles.section }>

								{ renderListCart }

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
						</View>
					);
				} }
				renderItem={ ({ item, index }) => {
					return (
						<View key={ 'item_' + index }>
							{ index > 0 && <View style={ { height: 5 } } /> }
							<CheckItem { ...item }
								onClickComplain={ (data) => setShowComplain(data) }
								deliveryId={ route.params.deliveryId }
								clientId={ route.params.clientId }
								onClickConfirm={ (data) => setShowConfirmItem(data) }
								itemIndex={ index }
							/>
						</View>
					);
				}
				}
			/>
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
				visible={ showComplain ? true : false }
				onRequestClose={ () => setShowComplain(null) }
				noScroll
			>
				<Complain
					onClose={ () => setShowComplain(null) }
					deliveryRouteItemId={ showComplain ? showComplain.deliveryRouteItemId : 'null' }
					deliveryId={ showComplain ? showComplain.deliveryId : undefined }
					clientId={ showComplain ? showComplain.clientId : undefined }
					itemName={ showComplain ? showComplain.itemName : undefined }
					existing={ showComplain ? showComplain.existing : undefined }
				/>
			</BottomSheet>

			<BottomSheet
				visible={ showConfirmItem ? true : false }
				onRequestClose={ () => setShowConfirmItem(null) }
				noScroll
			>
				<ConfirmItem
					onClose={ () => setShowConfirmItem(null) }
					deliveryRouteItemId={ showConfirmItem ? showConfirmItem.deliveryRouteItemId : 'null' }
					deliveryId={ showConfirmItem ? showConfirmItem.deliveryId : undefined }
					clientId={ showConfirmItem ? showConfirmItem.clientId : undefined }
					itemName={ showConfirmItem ? showConfirmItem.itemName : undefined }
					onOpenComplain={ (item) => {
						setShowConfirmItem(null);
						setShowComplain(item);
					} }
				/>
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
							carts: listCartReturned.filter((c) => c != ''),
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