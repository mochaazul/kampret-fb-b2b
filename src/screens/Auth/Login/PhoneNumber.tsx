import { StyleSheet, View, TextStyle } from 'react-native';
import React, { useState } from 'react';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { Button, Container, Input, Text } from '@components';
import { NavigationHelper } from '@helpers';
import { Auth } from '@validator';

interface PhoneNumberProps {
	onPhoneNumberSubmitted: (phoneNumber: string) => void;
	loading: boolean;
}
interface ForgotInterface {
	phoneNumber: string | null;
}

const Forgot = ({ onPhoneNumberSubmitted, loading }: PhoneNumberProps) => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const formik: FormikProps<ForgotInterface> = useFormik<ForgotInterface>({
		validateOnBlur: true,
		validationSchema: Auth.PhoneNumberValidationSchema,
		initialValues: {
			phoneNumber: null,
		},
		onSubmit: () => {
			// NavigationHelper.push('OTP');
			if (formik.values.phoneNumber) onPhoneNumberSubmitted(formik.values.phoneNumber);
		},
	});

	return (
		<View style={ styles.container }>
			<Text format={ Fonts.heading.h3 as TextStyle }>Masukkan Nomor Telepon Anda.</Text>
			<Text format={ Fonts.textBody.s.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
			<Input
				formik={ formik }
				name='phoneNumber'
				label='Nomor Telepon'
				placeholder='08XXX'
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
				loading={ loading }
				disabled={ !formik.values.phoneNumber || formik.errors.phoneNumber !== undefined }
			/>
		</View>
	);
};

export default Forgot;

const styles = StyleSheet.create({
	container: {
		padding: 20
	}
});