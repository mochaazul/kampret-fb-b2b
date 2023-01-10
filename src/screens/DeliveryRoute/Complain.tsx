import { StyleSheet, TextStyle, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FormikProps, useFormik } from 'formik';
import { PhotoFile } from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';

import { Input, Button, Text, Dropdown, CameraWidget } from '@components';
import { Auth } from '@validator';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Colors, Fonts, Images } from '@constant';
import { Actions } from '@store';
import { DeliveryInterface } from '@interfaces';
interface ComplainProps {
	onClose: () => void;
	deliveryRouteItemId: string | null;
	deliveryId: string | undefined;
	clientId: string | undefined;
	itemName: string | undefined;
	existing?: DeliveryInterface.IExistingComplain;
}
interface IComplain {
	description: string | null;
	qty: string | null;
	complainSelected: string | null;
	followupSelected: string | null;
	photoTaken: boolean;
}
const complainDropdown = [
	{ key: '1', value: 'Kuantitas Tidak Sesuai' },
	{ key: '2', value: 'Barang Rusak' },
	{ key: '3', value: 'Barang Tidak Sesuai Spek' },
];

const Complain = ({ onClose, deliveryRouteItemId, deliveryId, clientId, itemName, existing }: ComplainProps) => {
	// states
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
			console.log('prepare', pureItemId, {
				deliveryId,
				clientId,
				complaintDescription: formik.values.description,
				complainImageUrl: photos,
				itemId: pureItemId,
				qty: formik.values.qty,
				category: formik.values.complainSelected,
				followUp: formik.values.followupSelected
			});
			if (pureItemId) {
				sendComplain({
					deliveryId,
					clientId,
					complaintDescription: formik.values.description,
					complainImageUrl: photos,
					itemId: pureItemId,
					qty: formik.values.qty,
					category: formik.values.complainSelected,
					followUp: formik.values.followupSelected
				});
			}

		},
	});

	useEffect(() => {
		if (existing) {
			formik.setValues({
				description: existing.description,
				qty: existing.qty + '',
				followupSelected: existing.followUp,
				complainSelected: existing.category,
				photoTaken: existing.imageUrl && existing.imageUrl.length !== 0 ? true : false
			});
			if (existing.imageUrl && existing.imageUrl.length !== 0) {
				setPhotos(existing.imageUrl);
			}
		}
	}, []);


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

	const handleCaptureImage = (sequence: number) => {
		//just push new array for every capture (max 3 photos)
		if (!photos || photos.length !== 3) setShowCamera(true);
	};

	const memoizedRenderOption = useCallback((textOption: string) => {

		if (formik.values.followupSelected == textOption) {
			return (
				<TouchableOpacity style={ styles.option } disabled={ true }>
					<Images.Selected />
					<Text format={ Fonts.textBody.m.regular as TextStyle } style={ styles.marginLeft }>{ textOption }</Text>
				</TouchableOpacity>
			);
		} else if (existing && existing.followUp == textOption) {
			return (
				<TouchableOpacity style={ styles.option } disabled={ true }>
					<Images.Selected />
					<Text format={ Fonts.textBody.m.regular as TextStyle } style={ styles.marginLeft }>{ textOption }</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity style={ styles.option }
					onPress={ () => formik.setFieldValue('followupSelected', textOption) }
				>
					<Images.Unselect />
					<Text format={ Fonts.textBody.m.regular as TextStyle } style={ styles.marginLeft }>{ textOption }</Text>
				</TouchableOpacity>
			);
		}

	}, [formik.values.followupSelected]);

	const memoizedRenderComplainTitle = useMemo(() => {
		console.log('item name', existing);
		if (!itemName) return <View />;
		return (
			<View>
				<Text format={ Fonts.textBody.l.bold as TextStyle } style={ styles.headerTitle }>{ itemName }</Text>
				<Text format={ Fonts.textBody.m.regular as TextStyle } style={ styles.headerTitle } color={ Colors.gray.default }>{ deliveryRouteItemId }</Text>
			</View>
		);
	}, [itemName]);

	const memoizedRenderImage = useMemo(() => {
		// view photos when exist on local state
		if (photos) {
			return (
				<View style={ [styles.box, { marginTop: 15, marginBottom: 20 }] }>

					<Image source={ { uri: photos[0] } } style={ styles.images } resizeMethod='resize' resizeMode='cover' />

					{ !photos[1] &&
						<TouchableOpacity onPress={ () => handleCaptureImage(1) } style={ styles.addGallery }>
							<Images.IconeCameraRed width={ 20 } height={ 20 } />
							<Text format={ Fonts.textBody.s.bold as TextStyle } color={ Colors.company.red }>+Foto</Text>
						</TouchableOpacity>
					}
					{ photos[1] &&
						<Image source={ { uri: photos[1] } } style={ styles.images } resizeMethod='resize' resizeMode='cover' />
					}

					{ !photos[2] &&
						<TouchableOpacity onPress={ () => handleCaptureImage(2) } style={ styles.addGallery }>
							<Images.IconeCameraRed width={ 20 } height={ 20 } />
							<Text format={ Fonts.textBody.s.bold as TextStyle } color={ Colors.company.red }>+Foto</Text>
						</TouchableOpacity>
					}
					{ photos[2] &&
						<Image source={ { uri: photos[2] } } style={ styles.images } resizeMethod='resize' resizeMode='cover' />
					}

				</View>
			);
		} else {
			// default view when images photos is null
			return (
				<View style={ [styles.box, { marginTop: 15, marginBottom: 20 }] }>
					<TouchableOpacity onPress={ () => handleCaptureImage(0) } style={ styles.addGallery }>
						<Images.IconeCameraRed width={ 20 } height={ 20 } />
						<Text format={ Fonts.textBody.s.bold as TextStyle } color={ Colors.company.red }>+Foto</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={ () => handleCaptureImage(1) } style={ styles.addGallery }>
						<Images.IconeCameraRed width={ 20 } height={ 20 } />
						<Text format={ Fonts.textBody.s.bold as TextStyle } color={ Colors.company.red }>+Foto</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={ () => handleCaptureImage(2) } style={ styles.addGallery }>
						<Images.IconeCameraRed width={ 20 } height={ 20 } />
						<Text format={ Fonts.textBody.s.bold as TextStyle } color={ Colors.company.red }>+Foto</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}, [photos]);

	return (
		<View style={ styles.container }>
			<View style={ styles.header }>
				<View style={ styles.headerLeftRight } />
				<Text size={ 16 } lineHeight={ 18 } weight='700' align='center' style={ styles.headerTitle }>Keluhan</Text>
				<TouchableOpacity style={ styles.headerLeftRight } onPress={ () => onClose() }>
					<Images.IconClose />
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={ styles.scroll } showsVerticalScrollIndicator={ false }>
				{ memoizedRenderComplainTitle }
				<View style={ [styles.row, styles.card] }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Kategori Keluhan</Text>
					{ formik.errors.complainSelected &&
						<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>{ formik.errors.complainSelected }</Text>
					}
				</View>

				<Dropdown
					boxStyles={ { marginTop: 5 } }
					setSelected={ val => val ? formik.setFieldValue('complainSelected', val) : '9' }
					defaultOption={ { key: '9', value: existing ? existing.category : 'Pilih Salah Satu' } }
					data={ complainDropdown }
					save="value"
					dropdownTextStyles={ Fonts.textBody.m.regular as TextStyle }
					dropdownItemStyles={ Fonts.textBody.m.regular as TextStyle }
					inputStyles={ Fonts.textBody.m.regular as TextStyle }
					search={ false }
				/>
				<Input
					formik={ formik }
					name='description'
					label='Deskripsi'
					placeholder='Masukkan Deskripsi'
					keyboardType='ascii-capable'
					multiline={ true }
					numberOfLines={ 5 }
					mt={ 20 }
				/>
				<View style={ styles.card }>
					<View style={ styles.row }>
						<View style={ [styles.row, { flex: 3 }] }>
							<Text format={ Fonts.textBody.l.bold as TextStyle }>Masukkan Qty Keluhan</Text>
							{ formik.errors.qty &&
								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>Wajib diisi</Text>
							}
						</View>
						<View style={ [styles.inputBorder, styles.rowInput] }>
							<TextInput
								value={ formik.values.qty ? formik.values.qty : undefined }
								onChangeText={ text => formik.setFieldValue('qty', text) }
								style={ Fonts.heading.h2 as TextStyle }
								keyboardType='numeric'
								placeholder='0'
								maxLength={ 4 }
								placeholderTextColor={ Colors.gray.default }

							/>
							<Text format={ Fonts.textBody.m.regular as TextStyle } color={ Colors.gray.default }>Kg</Text>
						</View>

					</View>
				</View>
				<View style={ styles.row }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Foto</Text>
					{ formik.errors.photoTaken &&
						<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>Wajib lampirkan foto</Text>
					}
				</View>
				{ memoizedRenderImage }
				{/* TAKE_OUT <View style={ styles.card }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Video</Text>

					<Image source={ Images.OnBoarding[2] } style={ styles.video } resizeMethod='resize' resizeMode='cover' />
				</View> */}
				<View style={ styles.card }>
					<View style={ styles.row }>
						<Text format={ Fonts.textBody.l.bold as TextStyle }>Tindak Lanjut</Text>
						{ formik.errors.followupSelected &&
							<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>{ formik.errors.followupSelected }</Text>
						}
					</View>
					<View style={ [styles.box, styles.card] }>
						{ memoizedRenderOption('Disusulkan') }
						{ memoizedRenderOption('Disesuaikan') }
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
				{ existing &&
					<Button
						onPress={ () => handleButtonSubmit() }
						text='Hapus'
						textSize={ 14 }
						weight='700'
						backgroundColor='transparent'
						type='outline'
						color={ Colors.company.red }
						loading={ complainLoading }
						mt={ 20 }
					/>
				}
			</ScrollView>
			<CameraWidget
				isActive={ showCamera }
				onCapture={ onCapture }
				onClose={ () => setShowCamera(false) }
			/>
		</View>
	);
};

export default Complain;

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
});