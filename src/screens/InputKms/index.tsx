import React, { useCallback, useMemo, useEffect } from "react";
import { TextStyle, TouchableOpacity, View, Image } from "react-native";
import { useTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';

import { Button, Container, Input, Text } from "@components";
import styles from "./style";
import { Colors, Dispatches, Fonts, Images } from "@constant";
import { NavigationHelper, useAppSelector, useAppDispatch } from "@helpers";
import { NavigationProps } from '@interfaces';
import { Actions } from "@store";
import { FormikProps, useFormik } from 'formik';
import { Delivery } from '@validator';

type InputKmsScreenProps = NavigationProps<'InputKms'>;
type InputKM = {
	kmSpeedometer: string | null,
	photoUri: string | null;
};
const InputKms = ({ route }: InputKmsScreenProps) => {
	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);
	const setLongitude = useAppDispatch(Actions.miscAction.setLongitude);
	const setLatitude = useAppDispatch(Actions.miscAction.setLatitude);

	const tmpCapturedImg = useAppSelector(state => state.miscReducers.tmpImageUri);

	const latitude = useAppSelector(state => state.miscReducers.currentLatitude);
	const longitude = useAppSelector(state => state.miscReducers.currentLongitude);
	const loading = useAppSelector(state => state.deliveryReducers.loadingInputKm);

	const doInputKm = useAppDispatch(Actions.deliveryAction.inputKms);
	const clearLocation = useAppDispatch(Actions.miscAction.clearLocation);
	const inputKmOnFinish = useAppDispatch(Actions.deliveryAction.deliveryFinish);

	const { t: translate } = useTranslation();

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
						imageUrl: tmpCapturedImg,
						deliveryId: route.params?.deliveryId
					}

				);
			}
		},
	});

	const navigateToCapturePhoto = useCallback(
		() => {
			NavigationHelper.push('CapturePhoto');
		},
		[],
	);

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
			setTmpImgUri('');
			clearLocation();
		};
	}, []);

	const renderImage = useMemo(() => {
		if ((route && route.params?.photo) || tmpCapturedImg !== '') {
			formik.setFieldValue('photoUri', tmpCapturedImg !== '' && tmpCapturedImg ? tmpCapturedImg : route.params?.photo);
			return (
				<Image style={ styles.addImage } source={ { uri: tmpCapturedImg !== '' && tmpCapturedImg ? tmpCapturedImg : route.params?.photo } } />
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
	}, [route, tmpCapturedImg]);

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
				onPress={ navigateToCapturePhoto }
			>
				{ renderImage }

			</TouchableOpacity>

			{ renderButton }

		</Container >
	);
};

export default InputKms;
