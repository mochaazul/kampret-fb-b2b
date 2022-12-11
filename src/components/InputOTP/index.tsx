import { TextInput, TextStyle, View } from 'react-native';
import React, { LegacyRef } from 'react';

import { Colors, Fonts } from '@constant';
import { ComponentInterface } from '@interfaces';

const InputOTP: React.FC<ComponentInterface.IInputOTP> = props => {

	type ReadValueProps = { formikValue: string, index: number; };

	const {
		mt,
		formik,
	} = props;

	const inputRef1: LegacyRef<TextInput> | undefined = React.createRef();
	const inputRef2: LegacyRef<TextInput> | undefined = React.createRef();
	const inputRef3: LegacyRef<TextInput> | undefined = React.createRef();
	const inputRef4: LegacyRef<TextInput> | undefined = React.createRef();

	const onOtpKeyPress = (index: number, value: string, formikName: string) => {
		const focusNext = (index: number) => {
			switch (index) {
				case 0:
					inputRef2.current?.focus();
					break;
				case 1:
					inputRef3.current?.focus();
					break;
				case 2:
					inputRef4.current?.focus();
					break;
			}

		};

		switch (value.length) {
			case 0:
				formik?.setFieldValue(formikName, null);
				break;
			case 1:
				focusNext(index);
				formik?.setFieldValue(formikName, value);
				break;
			case 2:
				formik?.setFieldValue(formikName, value[1]);
				focusNext(index);
				break;
			case 4:
				formik.setFieldValue('otp1', value[0]);
				formik.setFieldValue('otp2', value[1]);
				formik.setFieldValue('otp3', value[2]);
				formik.setFieldValue('otp4', value[3]);
				break;
		}


	};

	const isBackspaceHandler = (key: string, index: number, formikName: string) => {
		if (key == 'Backspace') {
			if (index == 3) {
				inputRef4.current?.focus();
			} else if (index == 2) {
				inputRef3.current?.focus();
			} else if (index == 1) {
				inputRef2.current?.focus();
			}
		}
	};

	return (
		<View style={ mt ? { flexDirection: 'row', justifyContent: 'space-between', marginTop: mt } : { flexDirection: 'row', justifyContent: 'space-between' } }>
			<TextInput
				value={ formik?.values['otp1'] }
				onChangeText={ text => onOtpKeyPress(0, text, 'otp1') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 4 }
				ref={ inputRef1 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }
				autoComplete='sms-otp'
			/>
			<TextInput
				value={ formik?.values['otp2'] }
				onChangeText={ text => onOtpKeyPress(1, text, 'otp2') }
				onKeyPress={ ({ nativeEvent }) => isBackspaceHandler(nativeEvent.key, 1, 'otp2') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 4 }
				ref={ inputRef2 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }
				autoComplete='sms-otp'
			/>
			<TextInput
				value={ formik?.values['otp3'] }
				onChangeText={ text => onOtpKeyPress(2, text, 'otp3') }
				onKeyPress={ ({ nativeEvent }) => isBackspaceHandler(nativeEvent.key, 2, 'otp3') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 4 }
				ref={ inputRef3 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }
				autoComplete='sms-otp'
			/>
			<TextInput
				value={ formik?.values['otp4'] }
				onChangeText={ text => onOtpKeyPress(3, text, 'otp4') }
				onKeyPress={ ({ nativeEvent }) => isBackspaceHandler(nativeEvent.key, 3, 'otp4') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 4 }
				ref={ inputRef4 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }
				autoComplete='sms-otp'
			/>
		</View>
	);
};

export default React.memo(InputOTP);