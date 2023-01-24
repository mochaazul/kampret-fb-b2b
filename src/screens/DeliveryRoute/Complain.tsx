import { StyleSheet, TextStyle, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FormikProps, useFormik } from 'formik';
import { PhotoFile } from 'react-native-vision-camera';
import { ProgressBar } from "@react-native-community/progress-bar-android";

import { Input, Button, Text, Dropdown, CameraWidget } from '@components';
import { Auth } from '@validator';
import { useAppDispatch, useAppSelector, useInterval } from '@helpers';
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
	qtyOrder: {
		order: number,
		kgFactor: number;
	} | undefined;
}
interface IComplain {
	description: string | null;
	qty: string | null;
	complainSelected: string | null;
	followupSelected: string | null;
	photoTaken: boolean;
	complainQty: string | null;
}
const complainDropdown = [
	{ key: '1', value: 'Kuantitas Tidak Sesuai' },
	{ key: '2', value: 'Barang Rusak' },
	{ key: '3', value: 'Barang Tidak Sesuai Spek' },
];

const Complain = ({ onClose, deliveryRouteItemId, deliveryId, clientId, itemName, existing, qtyOrder }: ComplainProps) => {
	// states
	const [enableFormikValidation, setEnableFormikValidation] = useState<boolean>(false);
	const [photos, setPhotos] = useState<null | string[]>(null);
	const [showCamera, setShowCamera] = useState<boolean>(false);
	const [showError, setShowError] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);
	const [editReceived, setEditReceived] = useState<boolean>(false);

	//actions
	const sendComplain = useAppDispatch(Actions.deliveryAction.addComplaint);
	const deleteComplain = useAppDispatch(Actions.complainAction.deleteComplain);
	const editComplain = useAppDispatch(Actions.complainAction.updateComplain);

	//global state
	const complainLoading = useAppSelector(state => state.deliveryReducers.loadingComplain);
	const tmpApiResult = useAppSelector(state => state.miscReducers.tmpDeliveryComplainResult);

	const formik: FormikProps<IComplain> = useFormik<IComplain>({
		validationSchema: Auth.ComplainValidationSchema,
		validateOnChange: enableFormikValidation,
		validateOnBlur: enableFormikValidation,
		initialValues: {
			description: null,
			qty: null,
			followupSelected: '9',
			complainSelected: '9',
			photoTaken: false,
			complainQty: null
		},
		onSubmit: () => {
			//split itemID by '-'
			let pureItemId: string | null = null;
			if (deliveryRouteItemId) {
				pureItemId = deliveryRouteItemId.split('-')[1];
			}
			if (pureItemId) {
				const complainQty = calculateComplainQty();
				switch (complainQty) {
					case '0':
						setShowError('> QTY order : ' + qtyOrder?.order + ' kg  ');
						break;
					default:
						if (showError) setShowError(null);
						interval.start();
						if (existing) {
							editComplain({
								deliveryId,
								clientId,
								complaintDescription: formik.values.description,
								complainImageUrl: photos,
								itemId: pureItemId,
								qty: complainQty,
								category: formik.values.complainSelected,
								followUp: formik.values.followupSelected,
								receivedQty: formik.values.qty
							});
						} else {
							sendComplain({
								deliveryId,
								clientId,
								complaintDescription: formik.values.description,
								complainImageUrl: photos,
								itemId: pureItemId,
								qty: complainQty,
								category: formik.values.complainSelected,
								followUp: formik.values.followupSelected,
								receivedQty: formik.values.qty
							});
						}

				}

			}

		},
	});

	useEffect(() => {
		if (!complainLoading && progress) {
			interval.stop();
			setProgress(100);
		}
	}, [complainLoading]);

	const interval = useInterval(
		() => setProgress(progress => progress + 1),
		500,
	);

	const renderProgress = useMemo(() => {
		if (progress > 80) {
			interval.stop();
		}

		if (progress)
			return (
				<ProgressBar
					styleAttr='Horizontal'
					indeterminate={ false }
					progress={ progress * .01 }
					color={ Colors.company.red }
					style={ styles.progressBar }
				/>

			);
	}, [progress]);

	useEffect(() => {
		console.log('exist', existing);
		if (existing) {
			formik.setValues({
				description: existing.description,
				qty: existing.qtyReceived + '',
				followupSelected: existing.followUp,
				complainSelected: existing.category,
				photoTaken: existing.imageUrl && existing.imageUrl.length !== 0 ? true : false,
				complainQty: existing.qty + '',

			});
			if (existing.imageUrl && existing.imageUrl.length !== 0) {
				setPhotos(existing.imageUrl);
			}
		}
		return function () {
			interval.stop();
		};
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

	const calculateComplainQty = (): string => {
		if (qtyOrder) {
			if (formik.values.qty) {
				const result = qtyOrder.order - parseFloat(formik.values.qty);
				if (result < 0) {
					return '0';
				}
				return result.toFixed(1) + '';
			} else {
				return '' + qtyOrder.order;
			}
		} else {
			return '0';
		}

	};
	const handleEditComplain = () => {
		editComplain({
			deliveryId: deliveryId,
			clientId: clientId,
			complaintDescription: formik.values.description,
			complainImageUrl: existing?.imageUrl,
			itemId: deliveryRouteItemId,
			qty: formik.values.qty,
			category: formik.values.complainSelected,
			followUp: formik.values.followupSelected
		});
	};

	const handleDeleteComplain = () => {
		if (deliveryRouteItemId) {
			const itemId = deliveryRouteItemId.split('-');
			deleteComplain({ deliveryId, clientId, itemId: itemId[1] });
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
		if (!itemName) return <View />;
		return (
			<View>
				<Text format={ Fonts.textBody.l.bold as TextStyle } style={ styles.headerTitle }>{ itemName }</Text>
				<Text format={ Fonts.textBody.m.regular as TextStyle } style={ styles.headerTitle } color={ Colors.gray.default }>{ deliveryRouteItemId }</Text>
			</View>
		);
	}, [itemName]);

	const renderItemReceived = () => {

		return (
			<View style={ styles.card }>
				<Text format={ Fonts.textBody.l.bold as TextStyle } style={ styles.headerTitle }>Penerimaan Barang</Text>
				<View style={ [styles.box, { alignItems: 'center' }] }>
					<Text format={ Fonts.textBody.s.bold as TextStyle } style={ [styles.headerTitle, { flex: 3 }] } color={ Colors.gray.default }>Qty Barang Diterima</Text>
					<View style={ [styles.inputBorder, styles.rowInput] }>
						<TextInput
							value={ formik.values.qty ? formik.values.qty : undefined }
							onChangeText={ text => formik.setFieldValue('qty', text) }
							style={ [Fonts.heading.h2 as TextStyle, { padding: 0 }] }
							keyboardType='numeric'
							placeholder='0'
							maxLength={ 4 }
							placeholderTextColor={ Colors.gray.default }
						/>
						<Text format={ Fonts.textBody.m.regular as TextStyle } color={ Colors.gray.default }>Kg</Text>
					</View>
				</View>
			</View>
		);
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
			{ tmpApiResult &&
				<View style={ [styles.card, { marginBottom: 20, flexDirection: 'row', alignItems: 'center' }] }>
					<Images.IconWarnRed style={ { marginRight: 20 } } />
					<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>{ tmpApiResult }</Text>
				</View>
			}
			<ScrollView contentContainerStyle={ styles.scroll } showsVerticalScrollIndicator={ false }>
				{ memoizedRenderComplainTitle }
				{ renderItemReceived() }
				<View style={ styles.card }>
					<View style={ styles.row }>
						<View style={ [styles.row, { flex: 3 }] }>
							<Text format={ Fonts.textBody.l.bold as TextStyle }>Keluhan Barang</Text>
							{ formik.errors.qty &&
								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>Wajib diisi</Text>
							}
						</View>
						{/* <View style={ [styles.inputBorder, styles.rowInput] }>
							<TextInput
								value={ formik.values.complainQty ? formik.values.complainQty : undefined }
								onChangeText={ text => formik.setFieldValue('complainQty', text) }
								style={ Fonts.heading.h2 as TextStyle }
								keyboardType='numeric'
								placeholder='0'
								maxLength={ 4 }
								placeholderTextColor={ Colors.gray.default }

							/>
							<Text format={ Fonts.textBody.m.regular as TextStyle } color={ Colors.gray.default }>Kg</Text>
						</View> */}

						{ !editReceived &&
							<View style={ styles.row }>

								<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default }>Qty :</Text>
								<View style={ styles.row }>
									<Text format={ Fonts.textBody.s.bold as TextStyle } color={ Colors.gray.default }>{ calculateComplainQty() } Kg</Text>
									<TouchableOpacity onPress={ () => setEditReceived(true) }
										style={ { paddingVertical: 20, marginHorizontal: 15 } }
									>
										<Images.IconEdit />
									</TouchableOpacity>
								</View>
							</View>
						}
						{ editReceived &&
							<View style={ [styles.inputBorder, styles.rowInput] }>
								<TextInput
									value={ formik.values.complainQty ? formik.values.complainQty : undefined }
									onChangeText={ text => formik.setFieldValue('complainQty', text) }
									style={ [Fonts.heading.h2 as TextStyle, { padding: 0 }] }
									keyboardType='numeric'
									placeholder='0'
									maxLength={ 4 }
									placeholderTextColor={ Colors.gray.default }
								/>
								<Text format={ Fonts.textBody.m.regular as TextStyle } color={ Colors.gray.default }>Kg</Text>
							</View>
						}
					</View>
				</View>
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
					<View style={ [styles.row, { alignContent: 'center' }] }>
						<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Foto</Text>
						{ formik.errors.photoTaken &&
							<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.alert.red }>Wajib lampirkan foto</Text>
						}
						{ !formik.errors.photoTaken && renderProgress }
					</View>
					{ memoizedRenderImage }
				</View>
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
						onPress={ () => handleDeleteComplain() }
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

export default React.memo(Complain);

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: -1,
		backgroundColor: Colors.gray.light
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	card: {
		marginTop: 20,
		backgroundColor: Colors.white.pure
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
		paddingBottom: 30,
		backgroundColor: Colors.gray.light
	},
	firstCard: {
		marginBottom: 10
	},
	box: {
		flexDirection: 'row'
	},
	inputBorder: {
		padding: 10,
		flex: 2,
		borderColor: Colors.black.default,
		borderWidth: 1,
		borderRadius: 10
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
	progressBar: {
		marginHorizontal: 10,
		transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
		borderRadius: 10,
		width: '100%'
	},
});