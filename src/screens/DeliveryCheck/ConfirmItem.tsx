import { StyleSheet, TextStyle, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useMemo, useCallback } from 'react';
import { FormikProps, useFormik } from 'formik';
import { PhotoFile } from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';

import { Input, Button, Text, Dropdown, CameraWidget } from '@components';
import { Auth } from '@validator';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Colors, Fonts, Images } from '@constant';
import { Actions } from '@store';
import { DeliveryInterface } from '@interfaces';

interface ConfirmItemProps {
	onClose: () => void;
	onOpenComplain: (payload: DeliveryInterface.IComplainDialogProps) => void;
	deliveryRouteItemId: string | null;
	deliveryId: string | undefined;
	clientId: string | undefined;
	itemName: string | undefined;
}
interface IComplain {
	description: string | null;
	qty: string | null;
	complainSelected: string | null;
	followupSelected: string | null;
	photoTaken: boolean;
}

const ConfirmItem = ({ onClose, deliveryRouteItemId, deliveryId, clientId, itemName, onOpenComplain }: ConfirmItemProps) => {
	// states
	const [qty, setQty] = useState<number>(2);
	const [enableFormikValidation, setEnableFormikValidation] = useState<boolean>(false);
	const [photos, setPhotos] = useState<null | string[]>(null);
	const [showCamera, setShowCamera] = useState<boolean>(false);

	//actions
	const sendComplain = useAppDispatch(Actions.deliveryAction.addComplaint);

	//global state
	const complainLoading = useAppSelector(state => state.deliveryReducers.loadingComplain);

	const formik: FormikProps<IComplain> = useFormik<IComplain>({

		validationSchema: Auth.ComplainValidationSchema,
		validateOnChange: enableFormikValidation,
		validateOnBlur: enableFormikValidation,
		initialValues: {
			description: null,
			qty: null,
			followupSelected: '9',
			complainSelected: '9',
			photoTaken: false
		},
		onSubmit: () => {
			//split itemID by '-'
			let pureItemId: string | null = null;
			if (deliveryRouteItemId) {
				pureItemId = deliveryRouteItemId.split('-')[1];
			}
		},
	});

	const handleButtonSubmit = () => {
		setEnableFormikValidation(true);
		formik.handleSubmit();
	};

	const onCapture = (photo: PhotoFile) => {
		const imageURI = `file://` + photo.path;
		if (!photos) {
			setPhotos([imageURI]);
		} else {
			setPhotos([...photos, imageURI]);
		}
		if (!formik.values.photoTaken) {
			formik.setFieldValue('photoTaken', true);
		}
	};

	const memoizedRenderComplainTitle = useMemo(() => {
		if (!itemName) return <View />;
		return (
			<View style={ styles.box }>
				<View style={ { flex: 2 } }>
					<Text format={ Fonts.textBody.l.bold as TextStyle } style={ styles.headerTitle }>{ itemName }</Text>
					<Text format={ Fonts.textBody.m.regular as TextStyle } style={ styles.headerTitle } color={ Colors.gray.default }>{ deliveryRouteItemId }</Text>
				</View>
				<View style={ styles.buttonContainer }>
					<Button
						weight='700'
						backgroundColor='transparent'
						type='outline'
						color={ Colors.company.red }
						text='Buat Keluhan'
						onPress={ () => {
							if (onOpenComplain) {
								onOpenComplain(
									{ deliveryRouteItemId, deliveryId, clientId, itemName }
								);
							}
						}
						}

					/></View>
			</View>

		);
	}, [itemName]);

	return (
		<View style={ styles.container }>
			<View style={ styles.header }>
				<View style={ styles.headerLeftRight } />
				<Text size={ 16 } lineHeight={ 18 } weight='700' align='center' style={ styles.headerTitle }>Konfirmasi Penerimaan</Text>
				<TouchableOpacity style={ styles.headerLeftRight } onPress={ () => onClose() }>
					<Images.IconClose />
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={ styles.scroll } showsVerticalScrollIndicator={ false }>
				{ memoizedRenderComplainTitle }

				<View style={ styles.card }>
					<View style={ styles.row }>
						<View style={ [styles.row, { flex: 3 }] }>
							<Text format={ Fonts.textBody.l.bold as TextStyle }>Masukkan Qty Diterima</Text>
							{ formik.errors.qty &&
								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>Wajib diisi</Text>
							}
						</View>
						<View style={ [styles.inputBorder, styles.rowInput] }>
							<TextInput
								value={ formik.values.qty ? formik.values.qty : undefined }
								onChangeText={ text => formik.setFieldValue('qty', text) }
								style={ [Fonts.textBody.m.regular as TextStyle, { paddingVertical: 0 }] }
								keyboardType='numeric'
								placeholder='0'
								maxLength={ 4 }
								placeholderTextColor={ Colors.gray.default }

							/>
							<Text format={ Fonts.textBody.m.regular as TextStyle } color={ Colors.gray.default }>Kg</Text>
						</View>

					</View>
				</View>
				<Button

					onPress={ () => handleButtonSubmit() }
					text='Simpan'
					textSize={ 14 }
					weight='700'
					mt={ 30 }
					useShadow={ true }
					loading={ complainLoading }
				/>
			</ScrollView>

		</View>
	);
};

export default ConfirmItem;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: -1,
		backgroundColor: Colors.white.pure
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	card: {
		marginTop: 20
	},
	addGallery: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		width: 80,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: Colors.company.red,
		borderRadius: 5,
		marginRight: 5
	},
	images: {
		height: 80,
		width: 80,

		marginRight: 5,
		borderRadius: 5
	},
	video: {
		height: 167,
		width: 335,
		borderRadius: 5
	},
	header: {
		flexDirection: 'row',
		borderBottomColor: Colors.gray.line,
		borderBottomWidth: 1,
		marginVertical: 20,
		paddingBottom: 20
	},
	headerLeftRight: {
		flex: 1
	},
	headerTitle: {
		flex: 10
	},
	counter: {
		marginTop: 20,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	scroll: {
		paddingBottom: 30
	},
	firstCard: {
		marginBottom: 10
	},
	box: {
		flexDirection: 'row'
	},
	inputBorder: {
		padding: 10, flex: 1, borderColor: Colors.black.default, borderWidth: 1, borderRadius: 10
	},
	rowInput: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	marginLeft: {
		marginLeft: 10
	},
	option: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1
	},
	buttonContainer: { flex: 1, alignSelf: 'center' }
});