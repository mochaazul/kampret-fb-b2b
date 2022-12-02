import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Images, Fonts, Colors } from '@constant';
import { Text, Input, Button, Camera } from '@components';
import { FormikProps, useFormik } from 'formik';
import { Auth } from '@validator';
import { useAppDispatch, useAppSelector, useScanBarcodes } from '@helpers';
import { Actions } from '@store';

interface ManualInput {
	clientID: string | null;
}

interface ScanChoiceProps {
	onChoosen: (value: string) => void;
	deliveryId: string;
}

const ScanChoice = ({ onChoosen, deliveryId }: ScanChoiceProps) => {
	const [inputManualMode, setInputManualMode] = useState<boolean>(false);
	const [inputFromScanner, setInputFromScanner] = useState<boolean>(false);

	const { frameProcessor } = useScanBarcodes({ callback: (value) => onChoosen(value) });

	const loading = useAppSelector(state => state.deliveryReducers.loadingValidateClient);
	const result = useAppSelector(state => state.deliveryReducers.resultValidateClient);

	const validateClient = useAppDispatch(Actions.deliveryAction.validateClient);

	const formik: FormikProps<ManualInput> = useFormik<ManualInput>({
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: Auth.InputClientID,
		initialValues: {
			clientID: null
		},
		onSubmit: () => {
			const clientId = formik.values.clientID;

			if (clientId)
				validateClient({
					deliveryId: deliveryId,
					clientId: clientId
				});
		},
	});

	useEffect(() => {
		if (result)
			onChoosen(formik.values.clientID ?? '');
	}, [result]);

	if (!inputManualMode && !inputFromScanner) {
		return (
			<View style={ styles.container }>
				<TouchableOpacity style={ styles.row } onPress={ () => setInputFromScanner(true) }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Scan Barcode</Text>
					<Images.IconRight />
				</TouchableOpacity>
				<TouchableOpacity style={ styles.row } onPress={ () => setInputManualMode(true) }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Input Manual</Text>
					<Images.IconRight />
				</TouchableOpacity>
			</View>
		);
	} else if (inputFromScanner) {
		return (
			<View style={ styles.container }>
				<TouchableOpacity style={ styles.row } onPress={ () => setInputFromScanner(false) }>
					<View style={ { flex: 1 } } />
					<Text weight='700' size={ 16 } lineHeight={ 18 } align='center' style={ { flex: 5 } }>Validasi Client ID</Text>
					<Images.IconClose style={ { flex: 1 } } />
				</TouchableOpacity>
				<Text weight='700' size={ 20 } lineHeight={ 27 } align='center' mt={ 20 } color={ Colors.company.red } style={ { paddingHorizontal: 20 } }>Scan Barcode di Keranjang
					untuk Validasi Client ID</Text>
				<Camera frameProcessor={ frameProcessor } style={ { paddingHorizontal: -20, marginTop: 20, width: '100%', height: 300 } } />
				<Text weight='400' size={ 14 } lineHeight={ 20 } align='center' mt={ 30 } style={ { paddingHorizontal: 20 } }>*Pastikan barcode berada di dalam area kotak
					yang sudah tersedia</Text>

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
				<Button
					onPress={ () => { formik.handleSubmit(); } }
					text='Validasi'
					textSize={ 14 }
					weight='700'
					mt={ 30 }
					useShadow={ true }
					loading={ loading }
					disabled={ loading }
				/>
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
	}
});