import { BottomSheet, Button, Container, Input, ModalDialog, Text } from "@components";
import { FormikProps, useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, ScrollView, TextStyle, TouchableOpacity, View, StyleSheet } from "react-native";
import { ProgressBar } from "@react-native-community/progress-bar-android";

import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper, useAppDispatch, useAppSelector, Ratio, useInterval } from "@helpers";
import { Delivery } from "@validator";
import { Actions } from "@store";
import { NavigationProps, DeliveryInterface, DeliveryResponseInterface } from '@interfaces';
import { Shimmer } from "@components";

import Complain from "../DeliveryRoute/Complain";
import ConfirmItem from "./ConfirmItem";
import CheckItem, { CheckItemProp } from "./CheckItem";
import ConfirmArrival from "./ConfirmArrival";
import SuccessDeliveryDialog from "./SuccessDeliveryDialog";
import Notes from "./Notes";

import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";

interface CheckValues {
	receiverName: string,
	photoUri: string,
	// returnChecked: Array<string>;
}

const DeliveryCheck = ({ route }: NavigationProps<'DeliveryCheck'>) => {
	// const [showComplain, setShowComplain] = useState<DeliveryInterface.IComplainDialogProps | null>(null);
	const [showConfirmItem, setShowConfirmItem] = useState<DeliveryInterface.IComplainDialogProps | null>(null);
	const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
	const [complainSetter, setComplainSetter] = useState<string | null>(null);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [listCartReturned, setListCartReturned] = useState<Array<string>>([]);
	const [notes, setNotes] = useState<string | null>(null);
	const [needConfirmMode, setNeedConfirmMode] = useState<boolean>(false);
	const [showNotes, setShowNotes] = useState<boolean>(false);
	const [progress, setProgress] = useState(0);
	const [complainKey, setComplainKey] = useState(0);

	const miscState = useAppSelector(state => state.miscReducers);
	const arrivalData = useAppSelector(state => state.deliveryReducers.clientArrivalData);
	const successArrival = useAppSelector(state => state.deliveryReducers.arrivalConfirmation);
	const arrivalLoading = useAppSelector(state => state.deliveryReducers.arrivalLoading);
	const apiComplainResult = useAppSelector(state => state.miscReducers.tmpDeliveryComplainResult);

	const [itemChecks, setItemChecks] = useState<any[]>([]);

	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);
	const setMultiplePhotoCapture = useAppDispatch(Actions.miscAction.setTmpMultiplePhotoCapture);
	const getArrivalData = useAppDispatch(Actions.deliveryAction.getClientArrivalData);
	const arrivalConfirmation = useAppDispatch(Actions.deliveryAction.arrivalConfirmation);
	const closeArrivalSuccessDialog = useAppDispatch(Actions.deliveryAction.closeSuccessArrivalConfirmationDialog);
	const setApiComplainResult = useAppDispatch(Actions.miscAction.setDeliveryComplainResult);
	const deleteComplain = useAppDispatch(Actions.complainAction.deleteComplain);

	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused && complainKey) {
			setComplainKey(0);
		}
	}, [isFocused]);

	useEffect(() => {

		getArrivalData(route.params.deliveryId, route.params.clientId);

		return function () {
			setTmpImgUri('');
			setMultiplePhotoCapture(null);
			setNotes(null);
			setNeedConfirmMode(false);
			interval.stop();
		};
	}, []);

	const interval = useInterval(
		() => setProgress(progress => progress + 1),
		500,
	);

	useEffect(() => {
		if (!arrivalLoading && progress) {
			interval.stop();
			setProgress(100);
		}
	}, [arrivalLoading]);

	const renderProgress = useMemo(() => {

		if (progress > 80) {
			interval.stop();
		}

		if (progress)
			return (
				<View style={ [styles.addImage, StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255, 255, 255, .5)' }] }>
					<ProgressBar
						styleAttr='Horizontal'
						indeterminate={ false }
						progress={ progress * .01 }
						color={ Colors.company.red }
						style={ styles.progressBar }
					/>
				</View>
			);
	}, [progress]);

	// watcher to update list item
	useEffect(() => {
		if (arrivalData) setItemChecks(mappingItem(arrivalData));
	}, [arrivalData]);

	//watcher to hide bottomSheet after receive api response
	useEffect(() => {
		if (apiComplainResult) {
			getArrivalData(route.params.deliveryId, route.params.clientId);
			// setShowComplain(null);
			setApiComplainResult(null);
		}
	}, [apiComplainResult]);

	const formik: FormikProps<CheckValues> = useFormik<CheckValues>({
		validateOnBlur: true,
		// validateOnChange: enableValidation,
		validationSchema: Delivery.DeliveryCheckValidationSchema,
		initialValues: {
			receiverName: '',
			photoUri: '',
			// returnChecked: [],
		},
		onSubmit: () => { needConfirmMode ? setShowNotes(true) : setShowConfirm(true); },
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
				<View style={ { position: 'relative' } }>
					<Image style={ styles.addImage } source={ { uri: miscState.tmpImageUri } } />
					{ renderProgress }
				</View>

			);
		}

		const onError: boolean = formik.errors && formik.errors.photoUri ? true : false;
		return (
			<View style={ onError ? [styles.addImage, { borderColor: Colors.alert.red }] : styles.addImage }>
				<Images.IconCamera />

				<Text
					format={ Fonts.textBody.l.bold as TextStyle }
					color={ onError ? Colors.alert.red : Colors.gray.default }
					mt={ 20 }
				>
					+ Tambah Foto
				</Text>
			</View>
		);
	}, [miscState.tmpImageUri, formik.errors, progress]);

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
						followUp: item.complaint_follow_up,
						qtyReceived: item.qty_received

					} : undefined,
					isConfirm: item.confirmed,
					qtyOrder: {
						order: item.qty_order,
						kgFactor: 3,
						isConfirm: item.confirmed,
						qtyOrder: {
							order: item.qty_order,
							kgFactor: 3
						}
					}
				};
			});
		} else {
			return [];
		}
	};

	const renderCart = (checked: boolean, name: string, qty: number) => (
		<View
			style={ { flexDirection: 'row', alignContent: 'center', alignItems: 'center' } }
			key={ name }
		>
			<TouchableOpacity
				onPress={ () => {
					const newValue = [...listCartReturned];
					const indexItem = newValue.indexOf(name);

					// check if uncheck and cart_code not in array --> push cart code to array
					if (!checked && indexItem == -1)
						newValue.push(name);

					// check if check and cart_code in array --> remove cart code to array
					if (checked && indexItem > -1)
						newValue.splice(indexItem, 1);

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
	const renderListCart = useMemo(() => {
		if (arrivalData && arrivalData.carts) {
			return arrivalData.carts.map((item, index) =>
				renderCart(
					listCartReturned.indexOf(item.cart_code) > -1, item.cart_code, item.cart_qty
				)
			);
		} else {
			return (<View style={ styles.row }>
				<Images.ButtonCheck2 width={ 28 } height={ 28 } />
				<Text format={ Fonts.textBody.l.regular as TextStyle }
					color={ Colors.black.default }
					style={ { marginStart: 12 } }>Tidak ada</Text>
			</View>);
		}

	}, [arrivalData?.carts, listCartReturned]);

	const renderListItem = useMemo(() => {
		return itemChecks.map((item, index) =>
			<View key={ 'item_' + index }>
				{ index > 0 && <View style={ { height: 5 } } /> }
				<CheckItem { ...item }
					onClickComplain={ (data) => {
						NavigationHelper.push("ComplainItem", { ...data });
						// setShowComplain(data);
						setComplainKey(1);
					} }
					deliveryId={ route.params.deliveryId }
					clientId={ route.params.clientId }
					onClickConfirm={ (data) => null }
					itemIndex={ index }
					onCheckConfirm={ () => {
						const newItems = [...itemChecks];
						newItems[index].isConfirm = newItems[index].isConfirm ? false : true;

						if (newItems[index].isConfirm) newItems[index].isComplain = false;

						setItemChecks(newItems);
					} }
					onClickDelete={ (deleteItem) => deleteComplain(deleteItem) }
				/>
			</View>
		);
	}, [itemChecks]);

	const renderShimmerLoading = () => {
		return Array(6).fill(0).map((item, index) =>
			<View key={ index } style={ {
				alignSelf: 'center',
				marginVertical: 12
			} }>
				<Shimmer animate={ true } active width={ Ratio.screenWidth - 48 } height={ 120 } />
			</View>
		);
	};
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
			<ScrollView>
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
				{ !arrivalLoading && renderListItem }
				{ arrivalLoading && renderShimmerLoading() }
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
							onPress={ () => {
								if (needConfirmMode) {
									setNeedConfirmMode(false);
								}
								setEnableValidation(true);
								formik.handleSubmit();
							} }
							loading={ arrivalLoading }
							disabled={ itemChecks.some((item) => !item.isComplain ? !item.isConfirm : false) }
						/>
						<Button
							type="outline"
							backgroundColor="transparent"
							color={ Colors.company.red }
							text='Pengiriman Selesai & Butuh Konfirmasi'
							textSize={ 14 }
							weight='700'
							mt={ 20 }
							useShadow={ true }
							onPress={ () => {

								if (!needConfirmMode) {
									setNeedConfirmMode(true);
								}
								setEnableValidation(true);
								formik.handleSubmit();
							} }

						/>
					</View>
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

			{/* <BottomSheet
				visible={ showComplain ? true : false }
				onRequestClose={ () => setShowComplain(null) }
				noScroll
				key={ complainKey }
			>
				<Complain
					onClose={ () => setShowComplain(null) }
					deliveryRouteItemId={ showComplain ? showComplain.deliveryRouteItemId : 'null' }
					deliveryId={ showComplain ? showComplain.deliveryId : undefined }
					clientId={ showComplain ? showComplain.clientId : undefined }
					itemName={ showComplain ? showComplain.itemName : undefined }
					existing={ showComplain ? showComplain.existing : undefined }
					qtyOrder={ showComplain ? showComplain.qtyOrder : undefined }
					onClickCamera={ () => {
						NavigationHelper.push('CapturePhoto');
						setComplainKey(1);
					} }
				/>
			</BottomSheet> */}

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
						// setShowComplain(item);
						NavigationHelper.push("ComplainItem", { ...showConfirmItem });
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
						interval.start();
						arrivalConfirmation({
							recipientName: formik.values.receiverName,
							imageUrl: formik.values.photoUri,
							carts: listCartReturned.filter((cart) => cart != ''),
							deliveryId: route.params.deliveryId,
							clientId: route.params.clientId,
							clientName: arrivalData && arrivalData.client_name ? arrivalData.client_name : '',
							needConfirm: needConfirmMode,
							needConfirmNote: notes
						});
						setShowConfirm(false);
						setShowSuccessDialog(true);
					} }
				/>
			</BottomSheet>
			<BottomSheet
				visible={ showNotes }
				onRequestClose={ () => setShowNotes(false) }
				noScroll>
				<Notes onCreateNotes={ (notes) => { setNotes(notes); setShowNotes(false); setShowConfirm(true); } } />
			</BottomSheet>

		</Container >
	);
};

export default DeliveryCheck;