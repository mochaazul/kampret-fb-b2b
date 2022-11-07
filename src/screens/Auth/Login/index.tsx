import React, { useState } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { Button, Container, Input, Text } from '@components';
import { Auth } from '@validator';
import { NavigationHelper } from '@helpers';

interface MyValues {
	username: string,
	password: string,
}

const Login = () => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const formik: FormikProps<MyValues> = useFormik<MyValues>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: Auth.LoginValidationSchema,
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: () => {
			NavigationHelper.push('Home');
		},
	});

	return (
		<Container>
			<View style={ { flex: 1 } }>
				<Images.LogoFB />
				<Text format={ Fonts.heading.h2 as TextStyle } mt={ 20 }>Login</Text>
				<Text format={ Fonts.textBody.s.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
				<View style={ styles.form_container }>
					<Input
						formik={ formik }
						name='username'
						label='Username'
						placeholder='Masukkan username'
						keyboardType='ascii-capable' />
					<Input
						formik={ formik }
						name='password'
						label='Kata Sandi'
						placeholder='Masukkan username'
						mt={ 15 }
						secureTextEntry />
				</View>
				<View style={ { alignItems: 'flex-end' } }>
					<Button
						mt={ 15 }
						text='Lupa Password?'
						textSize={ 14 }
						weight='700'
						color={ Colors.gray.default }
						noPadding
						backgroundColor='transparent' />
				</View>
				<Button
					onPress={ () => { setEnableValidation(true); formik.handleSubmit(); } }
					text='Masuk'
					textSize={ 14 }
					weight='700'
					mt={ 30 }
				// disabled={ formik.errors
				// 	&& Object.keys(formik.errors).length === 0
				// 	&& Object.getPrototypeOf(formik.errors) === Object.prototype }
				/>
			</View>
			<View style={ styles.register_container }>
				<Text
					color={ Colors.black.default }
					weight='700' size={ 14 }>Ada kendala? </Text>

				<Button
					onPress={ () => NavigationHelper.push('Register') }
					weight='700'
					color={ Colors.company.red }
					text='Hubungi Kami'
					noPadding
					backgroundColor='transparent' />
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 30,
		flex: 1,
	},
	social_container: {
		flexDirection: 'row',
		marginTop: 20,
	},
	form_container: {
		marginTop: 30,
	},
	register_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30,
	},
	social_button: {
		flex: 1,
		marginHorizontal: 8,
	},
});
export default Login;
