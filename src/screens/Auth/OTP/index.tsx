import { StyleSheet, View, TextStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { Button, Container, InputOTP, Text } from '@components';
import { NavigationHelper } from '@helpers';
import { Auth } from '@validator';

let interval;

interface OTPInterface {
	otp1: number | null;
	otp2: number | null;
	otp3: number | null;
	otp4: number | null;
}

const OTPscreen = () => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [seconds, setSeconds] = useState(30);

	const formik: FormikProps<OTPInterface> = useFormik<OTPInterface>({
		// validateOnBlur: enableValidation,
		// validateOnChange: enableValidation,
		// validationSchema: Auth.PhoneNumberValidationSchema,
		initialValues: {
			otp1: null,
			otp2: null,
			otp3: null,
			otp4: null,
		},
		onSubmit: () => {
			NavigationHelper.push('Reset');
		},
	});

	useEffect(() => {
		let timeInterval = setTimeout(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				//clearInterval(timeInterval);
			}
		}, 1000);
		return () => {
			clearInterval(timeInterval);
		};
	});

	return (
		<Container noScroll>
			<Text format={ Fonts.heading.h3 as TextStyle }>Masukkan OTP</Text>
			<Text format={ Fonts.textBody.s.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
			<InputOTP
				formik={ formik }
				mt={ 20 } />

			<View style={ styles.row }>
				<Text format={ Fonts.textBody.m.bold as TextStyle }>Tidak terima kode OTP?</Text>
				{ seconds !== 0 &&
					<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.company.red }>00:{ seconds.toString().length == 2 ? seconds : '0' + seconds }</Text>
				}
				{ seconds === 0 &&
					<Button
						onPress={ () => setSeconds(30) }
						text='Kirim Ulang'
						textSize={ 14 }
						weight='700'
						color={ Colors.company.red }
						noPadding
						backgroundColor='transparent' />
				}
			</View>

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

export default OTPscreen;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});