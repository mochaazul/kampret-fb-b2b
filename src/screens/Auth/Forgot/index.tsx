import { StyleSheet, View, TextStyle } from 'react-native';
import React, { useState } from 'react';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { Button, Container, Input, Text } from '@components';
import { NavigationHelper } from '@helpers';
import { Auth } from '@validator';

interface ForgotInterface {
	phoneNumber: string | null;
}

const Forgot = () => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const formik: FormikProps<ForgotInterface> = useFormik<ForgotInterface>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: Auth.PhoneNumberValidationSchema,
		initialValues: {
			phoneNumber: null,
		},
		onSubmit: () => {
			NavigationHelper.push('OTP');
		},
	});

	return (
		<Container>
			<Text format={ Fonts.heading.h3 as TextStyle }>Masukkan Nomor Telepon Anda.</Text>
			<Text format={ Fonts.textBody.s.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
			<Input
				formik={ formik }
				name='phoneNumber'
				label='Nomor Telepon'
				placeholder='08XXXXX'
				mt={ 20 }
				keyboardType='phone-pad'
			/>
			<Button
				onPress={ () => { setEnableValidation(true); formik.handleSubmit(); } }
				text='Kirim'
				textSize={ 14 }
				weight='700'
				mt={ 30 }
				useShadow={ true }
			/>
		</Container>
	);
};

export default Forgot;

const styles = StyleSheet.create({});