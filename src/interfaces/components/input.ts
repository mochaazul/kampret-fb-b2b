/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { TextInput } from 'react-native';

interface IInput extends React.ComponentProps<typeof TextInput> {
	label?: string | undefined;
	mt?: number | undefined;
	rightIcon?: ReactNode | undefined;
	leftIcon?: ReactNode | undefined;
	formik?: any;
	name: string;
}

export default IInput;
