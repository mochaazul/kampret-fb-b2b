import { StyleSheet, TextStyle, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useMemo } from 'react';
import { FormikProps, useFormik } from 'formik';
import { PhotoFile } from 'react-native-vision-camera';

import { Input, Button, Text, Dropdown, CameraWidget } from '@components';
import { Auth } from '@validator';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Colors, Fonts, Images } from '@constant';
import { Actions } from '@store';
interface ComplainProps {
	onClose: () => void;
	deliveryRouteItemId: string | null;
	deliveryId: string | undefined;
	clientId: string | undefined;
}
interface IComplain {
	description: string | null;
	qty: string | null;
	complainSelected: string | null;
	followupSelected: string | null;
}
const complainDropdown = [
	{ key: '1', value: 'Kuantitas Tidak Sesuai' },
	{ key: '2', value: 'Barang Rusak' },
	{ key: '3', value: 'Barang Tidak Sesuai Spek' },
];

const followupDropdown = [
	{ key: '1', value: 'Disusulkan' },
	{ key: '2', value: 'Disesuaikan' }
];

const Complain = ({ onClose, deliveryRouteItemId, deliveryId, clientId }: ComplainProps) => {
	// states
	const [qty, setQty] = useState<number>(2);
	const [complainSelected, setComplainSelected] = useState('');
	const [photos, setPhotos] = useState<null | string[]>(null);
	const [showCamera, setShowCamera] = useState<boolean>(false);

	//actions
	const sendComplain = useAppDispatch(Actions.deliveryAction.addComplaint);

	//global state
	const complainLoading = useAppSelector(state => state.deliveryReducers.loadingComplain);

	const formik: FormikProps<IComplain> = useFormik<IComplain>({
		validateOnMount: false,
		validationSchema: Auth.ComplainValidationSchema,
		initialValues: {
			description: null,
			qty: null,
			followupSelected: null,
			complainSelected: null
		},
		onSubmit: () => {
			//split itemID by '-'
			let pureItemId: string | null = null;
			if (deliveryRouteItemId) {
				pureItemId = deliveryRouteItemId.split('-')[1];
			}

			if (pureItemId) {
				sendComplain({
					deliveryId,
					clientId,
					complaintDescription: formik.values.description,
					complainImageUrl: photos,
					itemId: pureItemId,
					qty: formik.values.qty,
					category: formik.values.complainSelected
				});
			}

		},
	});

	const onCapture = (photo: PhotoFile) => {
		const imageURI = `file://` + photo.path;
		if (!photos) {
			setPhotos([imageURI]);
		} else {
			setPhotos([...photos, imageURI]);
		}
	};

	const handleCaptureImage = (sequence: number) => {
		//just push new array for every capture (max 3 photos)
		if (!photos || photos.length !== 3) setShowCamera(true);
	};

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
				<Text format={ Fonts.textBody.l.bold as TextStyle }>Kategori Keluhan</Text>
				<Dropdown
					boxStyles={ { marginTop: 5 } }
					setSelected={ val => val ? formik.setFieldValue('complainSelected', val) : null }
					defaultOption={ { key: '1', value: 'Kuantitas Tidak Sesuai' } }
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
						<Text format={ Fonts.textBody.l.bold as TextStyle }>Jumlah Barang</Text>
						<TextInput
							value={ formik.values.qty ? formik.values.qty : undefined }
							onChangeText={ text => formik.setFieldValue('qty', text) }
							style={ { ...Fonts.heading.h2 as TextStyle, padding: 20, borderBottomColor: Colors.gray.default, borderBottomWidth: 1 } }
							keyboardType='numeric'
							placeholder='0'
							maxLength={ 4 }
							placeholderTextColor={ Colors.gray.default }

						/>
					</View>
				</View>
				<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Foto</Text>
				{ memoizedRenderImage }
				{/* TAKE_OUT <View style={ styles.card }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Video</Text>

					<Image source={ Images.OnBoarding[2] } style={ styles.video } resizeMethod='resize' resizeMode='cover' />
				</View> */}
				<Dropdown
					boxStyles={ { marginTop: 5 } }
					setSelected={ val => val ? formik.setFieldValue('followupSelected', val) : null }
					defaultOption={ { key: '1', value: 'Disusulkan' } }
					data={ followupDropdown }
					save="value"
					dropdownTextStyles={ Fonts.textBody.m.regular as TextStyle }
					dropdownItemStyles={ Fonts.textBody.m.regular as TextStyle }
					inputStyles={ Fonts.textBody.m.regular as TextStyle }
					search={ false }
				/>
				<Button
					onPress={ () => { formik.handleSubmit(); } }
					text='Simpan'
					textSize={ 14 }
					weight='700'
					mt={ 30 }
					useShadow={ true }
					disabled={ !formik.isValid }
					loading={ complainLoading }
				/>
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
		justifyContent: 'space-between'
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
});