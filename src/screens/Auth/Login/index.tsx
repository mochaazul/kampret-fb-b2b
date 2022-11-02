import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors } from '@constant';
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
				<Images.LogoText />
				<Text
					color={ Colors.black.default }
					size={ 24 }
					weight='700'
					mt={ 30 }>Sign In</Text>
				<Text
					color={ Colors.gray.default }
					mt={ 10 }
					numberOfLines={ 1 }>Please sign in to continue.</Text>
				<View style={ styles.form_container }>
					<Input
						formik={ formik }
						name='phone_number'
						label='Phone Number'
						placeholder='Enter your phone number'
						keyboardType='number-pad' />
					<Input
						formik={ formik }
						name='password'
						label='Password'
						placeholder='Enter your password'
						mt={ 20 }
						secureTextEntry />
				</View>
				<View style={ { alignItems: 'flex-end' } }>
					<Button
						mt={ 15 }
						text='Forgot Your Password?'
						weight='700'
						color={ Colors.black.default }
						noPadding
						backgroundColor='transparent' />
				</View>
				<Button
					onPress={ () => { setEnableValidation(true); formik.handleSubmit(); } }
					text='Sign In'
					weight='700'
					mt={ 30 } />
				<Text
					color={ Colors.gray.default }
					mt={ 20 }
					align='center'>or sign in with</Text>
				<View style={ styles.social_container }>
					<Button
						type='outline'
						color={ Colors.gray.default }
						buttonStyle={ styles.social_button }>
						<Images.Google />
					</Button>
					<Button
						type='outline'
						color={ Colors.gray.default }
						buttonStyle={ styles.social_button }>
						<Images.Facebook />
					</Button>
					<Button
						type='outline'
						color={ Colors.gray.default }
						buttonStyle={ styles.social_button }>
						<Images.Apple />
					</Button>
				</View>
			</View>
			<View style={ styles.register_container }>
				<Text
					color={ Colors.gray.default }
					weight='700'>Don’t have an account? </Text>
				<Button
					onPress={ () => NavigationHelper.push('Register') }
					weight='700'
					color={ Colors.black.default }
					text='Sign Up Here'
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
