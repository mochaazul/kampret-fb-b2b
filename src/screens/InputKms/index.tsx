import React, { useMemo, useEffect, useState } from "react";
import { TextStyle, TouchableOpacity, View, Image, StyleSheet, BackHandler } from "react-native";
import { useTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import { ProgressBar } from "@react-native-community/progress-bar-android";

import { Button, Container, Input, Text } from "@components";
import styles from "./style";
import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper, useAppSelector, useAppDispatch, useInterval } from "@helpers";
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
	const [progress, setProgress] = useState(0);
	const [showWarning, setShowWarning] = useState<null | string>(null);

	const setLongitude = useAppDispatch(Actions.miscAction.setLongitude);
	const setLatitude = useAppDispatch(Actions.miscAction.setLatitude);
	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);

	const previewImgURI = useAppSelector(state => state.miscReducers.tmpImageUri);
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
				if (route.params.existingStartKm && route.params.existingStartKm < parseInt(formik.values.kmSpeedometer ?? '0')) {
					interval.start();
					inputKmOnFinish({
						finishLocation: route.params.deliveryLocation,
						finishOdometer_image: previewImgURI,
						deliveryId: route.params.deliveryId,
						lat: latitude,
						long: longitude,
						odometer: formik.values.kmSpeedometer
					});
				} else {
					setShowWarning('KM kendaraan harus melebihi ' + route.params.existingStartKm + ' KM');
				}

			} else {
				interval.start();
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

	const interval = useInterval(
		() => setProgress(progress => progress + 1),
		500,
	);

	useEffect(() => {
		clearLocation();
		Geolocation.getCurrentPosition(
			info => {
				setLongitude(info.coords.longitude);
				setLatitude(info.coords.latitude);
			},

			error => console.log('geo err', error),
			{ timeout: 60000, enableHighAccuracy: true }
		);

		return function () {
			clearLocation();
			setTmpImgUri('');
			setShowWarning(null);
		};
	}, []);

	useEffect(() => {
		if (!loading && progress) {
			interval.stop();
			setProgress(100);
		}

		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => loading);

		return () => {
			backHandler.remove();
		};
	}, [loading]);

	useEffect(() => {
		if (previewImgURI !== '')
			formik.setFieldValue('photoUri', previewImgURI);
	}, [previewImgURI]);

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

	const renderImage = () => {
		if (previewImgURI !== '') {
			return (
				<View style={ { position: 'relative' } }>
					<Image style={ styles.addImage } source={ { uri: previewImgURI! } } />
					{ renderProgress }
				</View>
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
	};

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
					onPressRightButton: () => {
						if (!loading)
							NavigationHelper.pop(1);
					}
				}
			}
			contentContainerStyle={ { backgroundColor: Colors.white.pure } }
		>
			{ showWarning &&
				<View style={ styles.row }>
					<Images.IconWarnRed style={ { marginRight: 10 } } />
					<Text
						format={ Fonts.textBody.m.regular as TextStyle }
						color={ Colors.alert.red }
					>{ showWarning }
					</Text>
				</View>
			}

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
				onPress={ () => {
					// if (!progress) setShowCamera(true);
					NavigationHelper.push('CapturePhoto');
				} }
			>
				{ renderImage() }

			</TouchableOpacity>

			{ renderButton }

		</Container >
	);
};

export default InputKms;
