import React from 'react';
import { View } from 'react-native';
import { ToastData } from 'react-native-toast-message';

import { Ratio } from '@helpers';
import { Colors } from '@constant';

import Text from '../Text';

const MyToast = ({
	text1,
	text2,
	type,
}: {
	text1: string | undefined;
	text2: string | undefined;
	type: string;
}) => {
	return (
		<View
			style={ {
				alignSelf: 'center',
				width: Ratio.screenWidth - 44,
				backgroundColor: type === 'error' ? Colors.alert.red : Colors.alert.green,
				borderRadius: 16,
			} }>
			<View
				style={ {
					flexDirection: 'row',
					paddingVertical: 22,
					paddingHorizontal: 22,
					position: 'relative',
				} }>
				<View
					style={ {
						width: 20,
						height: 20,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: Colors.gray.light,
						borderRadius: 100,
						marginRight: 18,
					} }>
					<Text color={ type === 'error' ? Colors.alert.red : Colors.alert.green }>!</Text>
				</View>
				<View style={ { flex: 1 } }>
					<Text
						color='white'
						size={ 16 }
						weight='700'
					>
						{ text1 }
					</Text>
					<Text
						color='white'
						mt={ 8 }
					>
						{ text2 }
					</Text>
				</View>
			</View>
		</View >
	);
};

const ToastConfig = {
	error: ({ text1, text2 }: ToastData) => (
		<MyToast
			type='error'
			text1={ text1 }
			text2={ text2 } />
	),
	success: ({ text1, text2 }: ToastData) => (
		<MyToast
			type='success'
			text1={ text1 }
			text2={ text2 } />
	),
};

export default ToastConfig;
