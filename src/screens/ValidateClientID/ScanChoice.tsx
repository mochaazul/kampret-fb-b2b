import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { Images, Fonts, Colors } from '@constant';
import { Text, Input, Button } from '@components';
import { FormikProps, useFormik } from 'formik';
import { Auth } from '@validator';

interface ManualInput {
	clientID: string | null;
}

interface ScanChoiceProps {
	onChoosen: (value: string) => void;
}

const ScanChoice = ({ onChoosen }: ScanChoiceProps) => {
	const [inputManualMode, setInputManualMode] = useState<boolean>(false);

	const formik: FormikProps<ManualInput> = useFormik<ManualInput>({
		validateOnBlur: true,
		validateOnChange: true,
		validationSchema: Auth.InputClientID,
		initialValues: {
			clientID: null
		},
		onSubmit: () => {
			onChoosen('manual');
			console.log('inputed');
		},
	});

	if (!inputManualMode) {
		return (
			<View style={ styles.container }>
				<TouchableOpacity style={ styles.row }>
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
				<Button
					onPress={ () => { formik.handleSubmit(); } }
					text='Validasi'
					textSize={ 14 }
					weight='700'
					mt={ 30 }
					useShadow={ true }
				/>
			</View>
		);
	}

};

export default ScanChoice;

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