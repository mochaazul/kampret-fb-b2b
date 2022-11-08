import { TextInput, TextStyle, NativeSyntheticEvent, View, TextInputKeyPressEventData } from 'react-native';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../Text';
import { Colors, Fonts } from '@constant';
import { Ratio } from '@helpers';
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

		if (index === 0) {
			if (value === '') {
				//inputRef1.current?.focus();
			} else {
				inputRef2.current?.focus();
			}

		} else if (index === 1) {
			if (value === '') {
				//inputRef2.current?.focus();
			} else {
				inputRef3.current?.focus();
			}

		} else if (index === 2) {
			if (value === '') {
				//inputRef3.current?.focus();
			} else {
				inputRef4.current?.focus();
			}
		}
		formik?.setFieldValue(formikName, value);
	};

	const isBackspaceHandler = (key: string, index: number, formikName: string) => {
		if (key == 'Backspace') {
			if (index == 3) {
				inputRef3.current?.focus();
			} else if (index == 2) {
				inputRef2.current?.focus();
			} else if (index == 1) {
				inputRef1.current?.focus();
			}
		}
	};

	return (
		<View style={ mt ? { flexDirection: 'row', justifyContent: 'space-between', marginTop: mt } : { flexDirection: 'row', justifyContent: 'space-between' } }>
			<TextInput
				value={ formik?.values['otp1'] }
				onChangeText={ text => onOtpKeyPress(0, text, 'otp1') }
				//onKeyPress={ ({ nativeEvent }) => isBackspaceHandler(nativeEvent.key, 1, 'otp1') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 1 }
				ref={ inputRef1 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }

			/>
			<TextInput
				value={ formik?.values['otp2'] }
				onChangeText={ text => onOtpKeyPress(1, text, 'otp2') }
				onKeyPress={ ({ nativeEvent }) => isBackspaceHandler(nativeEvent.key, 1, 'otp2') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 1 }
				ref={ inputRef2 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }
			/>
			<TextInput
				value={ formik?.values['otp3'] }
				onChangeText={ text => onOtpKeyPress(2, text, 'otp3') }
				onKeyPress={ ({ nativeEvent }) => isBackspaceHandler(nativeEvent.key, 2, 'otp3') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 1 }
				ref={ inputRef3 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }
			/>
			<TextInput
				value={ formik?.values['otp4'] }
				onChangeText={ text => onOtpKeyPress(3, text, 'otp4') }
				onKeyPress={ ({ nativeEvent }) => isBackspaceHandler(nativeEvent.key, 3, 'otp4') }
				style={ { ...Fonts.heading.h2 as TextStyle, padding: 20 } }
				keyboardType='number-pad'
				maxLength={ 1 }
				ref={ inputRef4 }
				placeholder='-'
				placeholderTextColor={ Colors.gray.default }
			/>
		</View>
	);
};

export default React.memo(InputOTP);