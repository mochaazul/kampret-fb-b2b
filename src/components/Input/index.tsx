import { TextInput, TextStyle, TouchableWithoutFeedback, View } from 'react-native';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../Text';
import { Colors, Fonts } from '@constant';
import { Ratio } from '@helpers';
import { styles } from './style';
import { ComponentInterface } from '@interfaces';

const Input: React.FC<ComponentInterface.IInput> = props => {

	const {
		name,
		label,
		mt,
		rightIcon,
		leftIcon,
		secureTextEntry,
		formik,
		...resOfProps
	} = props;

	const inputRef: LegacyRef<TextInput> | undefined = React.createRef();

	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [showPassowrd, setShowPassowrd] = useState<boolean>(false);
	const input = { ...styles.input };

	const usingMemo = useMemo(() => {
		const defaultStyle = { ...styles.defaultStyle };
		const inputContainer = { ...styles.inputContainer };
		if (mt) {
			inputContainer.marginTop = Ratio.normalize(mt);
		}

		if (rightIcon) {
			defaultStyle.marginRight = Ratio.normalize(8);
		}

		if (leftIcon) {
			defaultStyle.marginLeft = Ratio.normalize(8);
		}

		return {
			defaultStyle,
			inputContainer,
		};
	}, [mt, rightIcon, leftIcon]);

	useEffect(() => {
		if (secureTextEntry) {
			setShowPassowrd(secureTextEntry);
		}
	}, [secureTextEntry]);

	return (
		<View style={ usingMemo.inputContainer } >
			{ label && (
				<View style={ styles.row }>
					<Text
						format={ Fonts.textBody.s.bold as TextStyle }
						color={ formik?.errors[name] ? Colors.alert.red : isFocus ? Colors.black.default : Colors.gray.default } >{ label }</Text>
					{ formik?.errors[name] && (
						<Text
							format={ Fonts.textBody.s.regular as TextStyle } color={ Colors.company.red }>{ formik?.errors[name] }</Text>

					) }
				</View>

			) }
			<TouchableWithoutFeedback onPress={ () => inputRef.current?.focus() }>
				<View style={ [input, { borderColor: formik?.errors[name] ? Colors.alert.red : isFocus ? Colors.black.default : Colors.gray.line }] }>
					{ leftIcon && leftIcon }
					<TextInput
						value={ formik?.values[name] }
						onChangeText={ formik?.handleChange(name) }
						style={ { ...Fonts.textBody.m.regular as TextStyle, paddingVertical: 0 } }
						onFocus={ () => setIsFocus(true) }
						onBlur={ () => setIsFocus(false) }
						ref={ inputRef }
						secureTextEntry={ showPassowrd }
						placeholderTextColor={ Colors.gray.default }
						{ ...resOfProps }
					/>
					{ rightIcon && rightIcon }
					{ secureTextEntry && (
						<Icon
							name={ showPassowrd ? 'eye-off' : 'eye' }
							onPress={ () => setShowPassowrd(!showPassowrd) }
							size={ 16 }
							color={ Colors.gray.default } />
					) }
				</View>
			</TouchableWithoutFeedback>

		</View>
	);
};

export default React.memo(Input);
