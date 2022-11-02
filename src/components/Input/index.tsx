import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../Text';
import { Colors } from '@constant';
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
			inputContainer.marginTop = Ratio.normalizeValue(mt);
		}

		if (rightIcon) {
			defaultStyle.marginRight = Ratio.normalizeValue(8);
		}

		if (leftIcon) {
			defaultStyle.marginLeft = Ratio.normalizeValue(8);
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
				<Text
					size={ 12 }
					color={ formik?.errors[name] ? Colors.alert.red : isFocus ? Colors.blue.default : undefined } >{ label }</Text>
			) }
			<TouchableWithoutFeedback onPress={ () => inputRef.current?.focus() }>
				<View style={ [input, { borderColor: formik?.errors[name] ? Colors.alert.red : isFocus ? Colors.blue.default : 'transparent' }] }>
					{ leftIcon && leftIcon }
					<TextInput
						value={ formik?.values[name] }
						onChangeText={ formik?.handleChange(name) }
						style={ usingMemo.defaultStyle }
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
			{ formik?.errors[name] && (
				<Text
					color={ Colors.alert.red }
					size={ 12 }
					mt={ 4 }>{ formik?.errors[name] }</Text>
			) }
		</View>
	);
};

export default React.memo(Input);
