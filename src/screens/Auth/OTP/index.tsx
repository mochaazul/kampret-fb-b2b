import { StyleSheet, View, TextStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { NavigationProps } from '@interfaces';
import { Button, Container, InputOTP, Text } from '@components';
import { NavigationHelper, useAppDispatch } from '@helpers';
import { Actions } from "@store";

let interval;

interface OTPInterface {
	otp1: number | null;
	otp2: number | null;
	otp3: number | null;
	otp4: number | null;
}

type OTPScreenProps = NavigationProps<'OTP'>;
const OTPscreen = ({ route }: OTPScreenProps) => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [seconds, setSeconds] = useState(30);

	const verifyOTP = useAppDispatch(Actions.authAction.verifyOTP);
	const requestOTP = useAppDispatch(Actions.authAction.requestOTP);

	const handleOnResendOTP = () => {
		setSeconds(30);
		requestOTP({ phone: route.params?.phoneNumber }, route.params?.authType);
	};

	const formik: FormikProps<OTPInterface> = useFormik<OTPInterface>({

		initialValues: {
			otp1: null,
			otp2: null,
			otp3: null,
			otp4: null,
		},
		onSubmit: () => {
			verifyOTP(
				{
					phone: route.params?.phoneNumber,
					otp_code: '' + formik.values.otp1 + formik.values.otp2
						+ formik.values.otp3 + formik.values.otp4
				}
				, route.params?.authType);

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
		<Container noScroll noPadding
			header={ { title: '', type: 'regular', headerStyle: { backgroundColor: Colors.white.background } } }
		>
			<Text format={ Fonts.heading.h3 as TextStyle } mt={ 10 }>Masukkan OTP</Text>
			<Text format={ Fonts.textBody.s.regular as TextStyle } mt={ 10 } color={ Colors.gray.default }>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
			<InputOTP
				formik={ formik }
				mt={ 20 } />

			<View style={ [styles.row, { marginTop: 40 }] }>
				<Text format={ Fonts.textBody.m.bold as TextStyle }>Tidak terima kode OTP?</Text>
				{ seconds !== 0 &&
					<Text format={ Fonts.textBody.m.bold as TextStyle } color={ Colors.company.red }>00:{ seconds.toString().length == 2 ? seconds : '0' + seconds }</Text>
				}
				{ seconds === 0 &&
					<Button
						onPress={ () => handleOnResendOTP() }
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