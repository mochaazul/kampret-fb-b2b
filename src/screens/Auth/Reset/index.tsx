import { StyleSheet, View, TextStyle } from 'react-native';
import React, { useState } from 'react';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { Button, Container, Input, Text } from '@components';
import { NavigationHelper } from '@helpers';
import { Auth } from '@validator';

interface ResetInterface {
	firstPassword: string | null;
	secondPassword: string | null;
}

const Reset = () => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const formik: FormikProps<ResetInterface> = useFormik<ResetInterface>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: Auth.ResetPasswordValidationSchema,
		initialValues: {
			firstPassword: null,
			secondPassword: null
		},
		onSubmit: () => {
			NavigationHelper.reset('Login');
		},
	});

	return (
		<Container>
			<Text format={ Fonts.heading.h3 as TextStyle }>Reset Kata Sandi</Text>
			<Text format={ Fonts.textBody.s.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
			<Input
				formik={ formik }
				name='firstPassword'
				label='Kata Sandi Baru'
				placeholder='Masukan Kata Sandi'
				mt={ 20 } secureTextEntry />
			<Input
				formik={ formik }
				name='secondPassword'
				label='Konfirmasi Kata Sandi'
				placeholder='Ulangi Kata Sandi'
				mt={ 20 } secureTextEntry />
			<Button
				onPress={ () => { setEnableValidation(true); formik.handleSubmit(); } }
				text='Simpan'
				textSize={ 14 }
				weight='700'
				mt={ 30 }
				useShadow={ true }
			/>
		</Container>
	);
};

export default Reset;

const styles = StyleSheet.create({});