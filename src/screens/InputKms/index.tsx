import React, { useMemo, useEffect, useState } from "react";
import { TextStyle, TouchableOpacity, View, Image } from "react-native";
import { useTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';

import { Button, CameraWidget, Container, Input, Text } from "@components";
import styles from "./style";
import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper, useAppSelector, useAppDispatch } from "@helpers";
import { NavigationProps } from '@interfaces';
import { Actions } from "@store";
import { FormikProps, useFormik } from 'formik';
import { Delivery } from '@validator';
import { PhotoFile } from "react-native-vision-camera";

type InputKmsScreenProps = NavigationProps<'InputKms'>;
type InputKM = {
	kmSpeedometer: string | null,
	photoUri: string | null;
};
const InputKms = ({ route }: InputKmsScreenProps) => {
	const [showCamera, setShowCamera] = useState<boolean>(false);
	const [previewImgURI, setPreviewImgURI] = useState<string>("");

	const setLongitude = useAppDispatch(Actions.miscAction.setLongitude);
	const setLatitude = useAppDispatch(Actions.miscAction.setLatitude);

	const latitude = useAppSelector(state => state.miscReducers.currentLatitude);
	const longitude = useAppSelector(state => state.miscReducers.currentLongitude);
	const loading = useAppSelector(state => state.deliveryReducers.loadingInputKm);

	const doInputKm = useAppDispatch(Actions.deliveryAction.inputKms);
	const clearLocation = useAppDispatch(Actions.miscAction.clearLocation);
	const inputKmOnFinish = useAppDispatch(Actions.deliveryAction.deliveryFinish);

	const { t: translate } = useTranslation();

	const onCapture = (photo: PhotoFile) => {
		const imageURI = `file://` + photo.path;
		setPreviewImgURI(imageURI);
	};

	const formik: FormikProps<InputKM> = useFormik<InputKM>({
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: Delivery.InputKMvalidationSchema,
		initialValues: {
			kmSpeedometer: null,
			photoUri: null
		},
		onSubmit: () => {
			if (route.params?.deliveryLocation) {
				inputKmOnFinish({
					finishLocation: route.params.deliveryLocation,
					finishOdometer_image: formik.values.kmSpeedometer,
					deliveryId: route.params.deliveryId
				});
			} else {
				doInputKm(
					{
						lat: latitude,
						long: longitude,
						odo: formik.values.kmSpeedometer,
						imageUrl: previewImgURI,
						deliveryId: route.params?.deliveryId
					}

				);
			}
		},
	});

	useEffect(() => {
		clearLocation();

		Geolocation.getCurrentPosition(
			info => {
				setLongitude(info.coords.longitude);
				setLatitude(info.coords.latitude);
			},

			error => console.log('geo err', error),
			{ timeout: 60000, enableHighAccuracy: true });

		return function () {
			clearLocation();
		};
	}, []);

	const renderImage = useMemo(() => {
		if ((route && route.params?.photo) || previewImgURI !== '') {
			formik.setFieldValue('photoUri', previewImgURI);
			return (
				<Image style={ styles.addImage } source={ { uri: previewImgURI } } />
			);
		}

		return (
			<View style={ styles.addImage }>
				<Images.IconCamera />
				<Text
					format={ Fonts.textBody.l.bold as TextStyle }
					color={ Colors.gray.default }
					mt={ 20 }>
					+ { translate('inputKM.addPhoto') }
				</Text>
			</View>
		);
	}, [route, previewImgURI]);

	const renderButton = useMemo(() => (
		<Button
			onPress={ () => formik.handleSubmit() }
			text={ translate('actions.continue') }
			textSize={ 14 }
			weight='700'
			mt={ 30 }
			useShadow={ true }
			disabled={ !formik.isValid }
			loading={ loading }
		/>
	), [formik, loading]);

	return (
		<Container
			noPadding
			noScroll
			header={
				{
					type: 'regular',
					title: 'Input KM Kendaraan',
					showLeftButton: false,
					rightButton: <Images.IconClose />,
					onPressRightButton: () => NavigationHelper.pop(1)
				}
			}
			contentContainerStyle={ { backgroundColor: Colors.white.pure } }
		>

			<Input
				name="kmSpeedometer"
				label={ translate('inputKM.vehicleBarometer') }
				mt={ 16 }
				formik={ formik }
			/>

			<Text
				format={ Fonts.textBody.l.bold as TextStyle }
				color={ Colors.black.default }
				mt={ 20 }
			>
				{ translate('inputKM.photo') }
			</Text>

			<TouchableOpacity
				activeOpacity={ .75 }
				onPress={ () => setShowCamera(true) }
			>
				{ renderImage }

			</TouchableOpacity>

			{ renderButton }

			<CameraWidget
				isActive={ showCamera }
				onCapture={ onCapture }
				onClose={ () => setShowCamera(false) }
			/>

		</Container >
	);
};

export default InputKms;
