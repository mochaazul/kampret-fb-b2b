import React, { useEffect, useState } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts, Variables, Dispatches } from '@constant';
import { Button, Container, Input, Text, BottomSheet } from '@components';
import { Auth } from '@validator';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from "@store";
import PhoneNumber from './PhoneNumber';

interface MyValues {
	username: string,
	password: string,
}

const Login = () => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [showPhoneInput, setShowPhoneInput] = useState<'login' | 'reset' | null>(null);

	const postLogin = useAppDispatch(Actions.authAction.login);
	const requestOTP = useAppDispatch(Actions.authAction.requestOTP);
	const resetLoginError = useAppDispatch(Actions.authAction.resetLoginError);

	const loadingAuth = useAppSelector(state => state.authReducers.loading);
	const loadingError = useAppSelector(state => state.authReducers.loginError);
	const user = useAppSelector(state => state.authReducers.user);

	const formik: FormikProps<MyValues> = useFormik<MyValues>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: Auth.LoginValidationSchema,
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: () => {
			// formik.setErrors({ username: 'user asdad' });
			postLogin(formik.values);
		},
	});

	useEffect(() => {
		if (user && user.user_status == Variables.USER_STATUS.UNVERIFIED_USER && !showPhoneInput) setShowPhoneInput('login');
		if (loadingError && !formik.errors.username) formik.setErrors(loadingError);
	}, [user, loadingError]);

	useEffect(() => {
		return () => {
			resetLoginError();
		};
	}, []);

	return (
		<Container noPadding>
			<View style={ { flex: 1, marginTop: 20 } }>
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
						placeholder='Masukkan Kata Sandi'
						mt={ 15 }
						secureTextEntry />
				</View>
				<View style={ { alignItems: 'flex-end' } }>
					<Button
						onPress={ () => setShowPhoneInput('reset') }
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
					useShadow={ true }
					disabled={ formik.values == formik.initialValues }
					loading={ loadingAuth }
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
			<BottomSheet
				visible={ showPhoneInput !== null }
				onRequestClose={ () => setShowPhoneInput(null) }
			>
				<PhoneNumber
					onPhoneNumberSubmitted={ PhoneNumber => requestOTP({ phone: '62' + PhoneNumber.slice(1) }, showPhoneInput) }
					loading={ loadingAuth }
				/>
			</BottomSheet>
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
		marginBottom: 30,
		marginTop: 30
	},
	social_button: {
		flex: 1,
		marginHorizontal: 8,
	},
});
export default Login;
