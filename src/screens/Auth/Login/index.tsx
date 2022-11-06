import React, { useState } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { Button, Container, Input, Text } from '@components';
import { Auth } from '@validator';
import { NavigationHelper } from '@helpers';

interface MyValues {
	phone_number: string,
	password: string,
}

const Login = () => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const formik: FormikProps<MyValues> = useFormik<MyValues>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: Auth.LoginValidationSchema,
		initialValues: {
			phone_number: '',
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
				{/* <Text type={ Fonts.heading.h2 as TextStyle }
					mt={ 20 }>Login</Text> */}
				<Text
					color={ Colors.gray.default }
					size={ 12 }
					weight='400'
					mt={ 10 }
					numberOfLines={ 1 }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
				<View style={ styles.form_container }>
					<Input
						formik={ formik }
						name='username'
						label='Phone Number'
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
					mt={ 30 } />
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
