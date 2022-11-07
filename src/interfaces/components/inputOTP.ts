/* eslint-disable @typescript-eslint/no-explicit-any */

import { TextInput } from 'react-native';

interface IInputOTP extends React.ComponentProps<typeof TextInput> {
	mt?: number | undefined;
	formik?: any;
}

export default IInputOTP;
