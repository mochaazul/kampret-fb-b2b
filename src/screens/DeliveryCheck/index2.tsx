import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Image, TextStyle, TouchableOpacity, View, StyleSheet } from "react-native";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import { FormikProps, useFormik } from "formik";

import { NavigationHelper, Ratio, useAppDispatch, useAppSelector, useInterval } from "@helpers";
import { DeliveryResponseInterface, NavigationProps } from "@interfaces";
import { Actions } from "@store";
import { BottomSheet, Button, Container, Input, ModalDialog, Shimmer, Text } from "@components";
import { Colors, Fonts, Images } from "@constant";
import { Delivery } from "@validator";

import styles from "./styles";
import CheckItem2 from "./CheckItem2";
import ConfirmArrival from "./ConfirmArrival";
import Notes from "./Notes";
import SuccessDeliveryDialog from "./SuccessDeliveryDialog";

interface CheckValues {
	receiverName: string,
	photoUri: string,
}


const DeliveryArrival = ({ route }: NavigationProps<'DeliveryCheck'>) => {

	const arrivalData = useAppSelector(state => state.deliveryReducers.clientArrivalData);
	const arrivalLoading = useAppSelector(state => state.deliveryReducers.arrivalLoading);
	const tmpImgUri = useAppSelector(state => state.miscReducers.tmpImageUri);
	const successArrival = useAppSelector(state => state.deliveryReducers.arrivalConfirmation);
	const apiComplainResult = useAppSelector(state => state.miscReducers.tmpDeliveryComplainResult);

	const getArrivalData = useAppDispatch(Actions.deliveryAction.getClientArrivalData);
	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);
	const deleteComplain = useAppDispatch(Actions.complainAction.deleteComplain);
	const arrivalConfirmation = useAppDispatch(Actions.deliveryAction.arrivalConfirmation);
	const closeArrivalSuccessDialog = useAppDispatch(Actions.deliveryAction.closeSuccessArrivalConfirmationDialog);
	const setApiComplainResult = useAppDispatch(Actions.miscAction.setDeliveryComplainResult);

	const [listCheckIds, setListCheckIds] = useState<number[]>([]);
	const [needConfirmMode, setNeedConfirmMode] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [progress, setProgress] = useState(0);
	const [listCartReturned, setListCartReturned] = useState<Array<string>>([]);
	const [showNotes, setShowNotes] = useState<boolean>(false);
	const [notes, setNotes] = useState<string | null>(null);

	const interval = useInterval(
		() => setProgress(progress => progress + 1),
		500,
	);

	const formik: FormikProps<CheckValues> = useFormik<CheckValues>({
		validateOnBlur: true,
		// validateOnChange: enableValidation,
		validationSchema: Delivery.DeliveryCheckValidationSchema,
		initialValues: {
			receiverName: '',
			photoUri: '',
		},
		onSubmit: () => { needConfirmMode ? setShowNotes(true) : setShowConfirm(true); },
	});

	useEffect(() => {
		getArrivalData(route.params.deliveryId, route.params.clientId);

		return () => {
			setTmpImgUri('');
		};
	}, []);

	//watcher to hide bottomSheet after receive api response
	useEffect(() => {
		if (apiComplainResult) {
			getArrivalData(route.params.deliveryId, route.params.clientId);
			setApiComplainResult(null);
		}
	}, [apiComplainResult]);

	const renderShimmerLoading = () => {
		return Array(6).fill(0).map((_item, index) =>
			<View
				key={ index }
				style={ {
					alignSelf: 'center',
					marginVertical: 12
				} }>
				<Shimmer
					animate={ true }
					active
					width={ Ratio.screenWidth - 48 }
					height={ 120 }
				/>
			</View>
		);
	};

	const renderCustomerInfo = () => {
		return (
			<>
				<View style={ styles.customerInfo }>
					<Images.IconLocation style={ { marginTop: 4 } } />

					<View style={ { marginStart: 16 } }>

						<Text
							format={ Fonts.paragraph.l.bold as TextStyle }
							color={ Colors.black.default }>
							{ arrivalData?.client_name }
						</Text>

						<Text
							format={ Fonts.paragraph.m.regular as TextStyle }
							color={ Colors.gray.default } style={ { marginTop: 10 } }>
							{ arrivalData?.client_address }
						</Text>
					</View>
				</View>

				<View style={ styles.separator } />
			</>
		);
	};

	const renderProgress = () => {
		if (progress > 80) {
			interval.stop();
		}

		if (progress)
			return (
				<View
					style={ [
						styles.addImage,
						StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255, 255, 255, .5)' }
					] }
				>
					<ProgressBar
						styleAttr='Horizontal'
						indeterminate={ false }
						progress={ progress * .01 }
						color={ Colors.company.red }
						style={ styles.progressBar }
					/>
				</View>
			);
	};

	const renderImage = useMemo(() => {
		if (tmpImgUri) {
			formik.setFieldValue('photoUri', tmpImgUri);
			return (
				<View style={ { position: 'relative' } }>
					<Image style={ styles.addImage } source={ { uri: tmpImgUri } } />
					{ renderProgress() }
				</View>
			);
		}

		formik.setFieldValue('photoUri', '');
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
	}, [tmpImgUri]);

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

	const renderListCart = () => {
		if (arrivalData && arrivalData.carts) {
			return arrivalData.carts.map((item) =>
				renderCart(
					listCartReturned.indexOf(item.cart_code) > -1, item.cart_code, item.cart_qty
				)
			);
		}

		return (
			<View style={ styles.row }>
				<Images.ButtonCheck2 width={ 28 } height={ 28 } />
				<Text format={ Fonts.textBody.l.regular as TextStyle }
					color={ Colors.black.default }
					style={ { marginStart: 12 } }>Tidak ada</Text>
			</View>
		);
	};

	const confirmItem = useCallback((item: DeliveryResponseInterface.Item) => {
		setListCheckIds(listCheckIds => [...listCheckIds, item.delivery_route_item_id]);
	}, [listCheckIds]);

	const unconfirmItem = useCallback((item: DeliveryResponseInterface.Item) => {
		setListCheckIds(listCheckIds => [...listCheckIds.filter((id) => id != item.delivery_route_item_id)]);
	}, [listCheckIds]);

	return (
		<Container
			noPadding
			noScroll
			header={ {
				title: 'Cek Serah Terima x',
				type: 'regular'
			} }
			contentContainerStyle={ styles.container }
		>
			{ arrivalLoading && renderShimmerLoading() }

			{ arrivalData && renderCustomerInfo() }

			<FlatList
				data={ arrivalData?.items }
				keyExtractor={ (item) => String(item.delivery_route_item_id) }
				renderItem={
					({ item }) => <CheckItem2
						item={ item }
						confirmed={ [...listCheckIds].includes(item.delivery_route_item_id) }
						onConfirm={ confirmItem }
						onUnconfirm={ unconfirmItem }
						onComplain={
							(item) => {
								setTmpImgUri(null);
								NavigationHelper.push('ComplainItem', {
									deliveryRouteItemId: item.sales_no + '-' + item.delivery_route_item_id,
									deliveryId: route.params.deliveryId,
									clientId: route.params.clientId,
									itemName: item.item_name,
									existing: item.complaint_description ? {
										category: item.complaint_category,
										description: item.complaint_description,
										qty: item.qty_reject,
										imageUrl: item.complaint_images,
										followUp: item.complaint_follow_up,
										qtyReceived: item.qty_received

									} : undefined,
									qtyOrder: {
										order: item.qty_order,
										kgFactor: 3
									}
								});
							}
						}
						onDeleteComplain={ (item) => deleteComplain({
							deliveryId: route.params.deliveryId,
							clientId: route.params.clientId,
							itemId: item.delivery_route_item_id
						}) }
					/>
				}
				ListHeaderComponent={
					<Text
						color={ Colors.black.default }
						format={ Fonts.paragraph.l.bold as TextStyle }
						style={ styles.label }
					>
						Pesanan
					</Text>
				}
				ListFooterComponent={
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
								onPress={ () => NavigationHelper.push('CapturePhoto') }
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

							{ renderListCart() }

							<Button
								text='Pengiriman Selesai'
								textSize={ 14 }
								weight='700'
								mt={ 30 }
								useShadow={ true }
								onPress={ () => {
									setNeedConfirmMode(false);
									formik.handleSubmit();
								} }
								loading={ arrivalLoading }
								disabled={ arrivalData?.items.some((item) => !item.complaint_description && !listCheckIds.includes(item.delivery_route_item_id)) }
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
									setNeedConfirmMode(true);
									formik.handleSubmit();
								} }

							/>
						</View>
					</View>
				}
			/>

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
					} }
				/>
			</BottomSheet>

			<BottomSheet
				visible={ showNotes }
				onRequestClose={ () => setShowNotes(false) }
				noScroll>
				<Notes
					onCreateNotes={ (notes) => {
						setNotes(notes);
						setShowNotes(false);
						setShowConfirm(true);
					} }
				/>
			</BottomSheet>

			<ModalDialog visible={ successArrival !== null }
				onRequestClose={ () => closeArrivalSuccessDialog() }>
				<SuccessDeliveryDialog
					testBarcodeValue={ successArrival?.deliveryId }
					custName={ successArrival?.clientName }
					time={ successArrival?.time }
					onButtonPressed={ () => { closeArrivalSuccessDialog(); NavigationHelper.pop(1); } }
				/>
			</ModalDialog>

		</Container>
	);
};

export default DeliveryArrival;