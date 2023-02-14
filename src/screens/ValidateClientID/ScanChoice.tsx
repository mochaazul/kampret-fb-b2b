import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

import { Images, Fonts, Colors } from '@constant';
import { Text, Input, Button } from '@components';
import { FormikProps, useFormik } from 'formik';
import { Auth } from '@validator';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

interface ManualInput {
	clientID: string | null;
}

interface ScanChoiceProps {
	onChoosen: (value: string) => void;
	deliveryId: string;
	onClose: () => void;
}

const ScanChoice = ({ onChoosen, deliveryId, onClose }: ScanChoiceProps) => {
	const [inputManualMode, setInputManualMode] = useState<boolean>(false);

	const [scanResult, setScanResult] = useState('');

	// const loading = useAppSelector(state => state.deliveryReducers.loadingValidateClient);
	const [loading, setLoading] = useState(false);
	const result = useAppSelector(state => state.deliveryReducers.resultValidateClient);

	const validateClient = useAppDispatch(Actions.deliveryAction.validateClient);

	useEffect(
		() => {
			if (!loading && scanResult) {
				validateClient({
					deliveryId: deliveryId,
					clientId: scanResult
				});
			}
		},
		[loading, scanResult]
	);

	const formik: FormikProps<ManualInput> = useFormik<ManualInput>({
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: Auth.InputClientID,
		initialValues: {
			clientID: null
		},
		onSubmit: () => {
			const clientId = formik.values.clientID;
			if (clientId) {
				setScanResult(clientId);
				setTimeout(() => setLoading(true), 100);
			}
		},
	});

	useEffect(() => {
		if (result != undefined)
			onChoosen(result ? scanResult : '');
	}, [result]);

	const renderButton = useMemo(() => (

		<Button
			onPress={ () => { formik.handleSubmit(); } }
			text='Validasi'
			textSize={ 14 }
			weight='700'
			mt={ 30 }
			useShadow={ true }
			loading={ loading }

		/>
	), [loading]);

	if (!inputManualMode) {
		return (
			<View style={ styles.container }>
				<TouchableOpacity
					style={ styles.row }
					onPress={ () => {
						onClose();
						NavigationHelper.push('ScanBarcode', { deliveryId: deliveryId });
					} }
				>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Scan Barcode</Text>
					<Images.IconRight />
				</TouchableOpacity>
				<TouchableOpacity style={ styles.row } onPress={ () => setInputManualMode(true) }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Input Manual</Text>
					<Images.IconRight />
				</TouchableOpacity>
			</View>
		);
	} else {
		return (
			<View style={ styles.container }>
				<Text format={ Fonts.heading.h3 as TextStyle }>Masukkan Client ID</Text>
				<Text format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.gray.default } mt={ 10 }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
				<Input
					formik={ formik }
					name='clientID'
					label='Client ID'
					placeholder='Masukkan Client ID'
					keyboardType='ascii-capable'
					mt={ 20 }
				/>

				{ renderButton }
			</View>
		);
	}
};

export default React.memo(ScanChoice);

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		borderBottomColor: Colors.gray.line,
		borderBottomWidth: 1
	},
	cameraContainer: {
		paddingHorizontal: -20,
		marginTop: 20,
		width: '100%',
		height: 300
	},
	camera: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	loadingStyle: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0, left: 0, right: 0, bottom: 0
	},
});