import { StyleSheet, TextStyle, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FormikProps, useFormik } from 'formik';

import { Input, Button, Text } from '@components';
import { Auth } from '@validator';
import { Colors, Fonts, Images } from '@constant';
interface ComplainProps {
	onClose: () => void;
}
interface IComplain {
	description: string | null;
}
const Complain = ({ onClose }: ComplainProps) => {
	const formik: FormikProps<IComplain> = useFormik<IComplain>({
		validateOnBlur: true,
		validationSchema: Auth.ComplainValidationSchema,
		initialValues: {
			description: null
		},
		onSubmit: () => {
			// console.log('submit pressed');
		},
	});
	return (
		<View style={ styles.container }>
			<View style={ styles.header }>
				<View style={ styles.headerLeftRight } />
				<Text size={ 16 } lineHeight={ 18 } weight='700' align='center' style={ styles.headerTitle }>Keluhan</Text>
				<TouchableOpacity style={ styles.headerLeftRight } onPress={ () => onClose() }>
					<Images.IconClose />
				</TouchableOpacity>
			</View>

			<Input
				formik={ formik }
				name='description'
				label='Deskripsi'
				placeholder='Masukkan Deskripsi'
				keyboardType='ascii-capable'
				multiline={ true }
				numberOfLines={ 5 }
				mt={ 20 }
			/>
			<View style={ styles.card }>
				<View style={ styles.row }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Jumlah Barang</Text>
					<Text format={ Fonts.textBody.m.regular as TextStyle }>(pack)</Text>
				</View>
				<Text>Count Changer</Text>
			</View>

			<View style={ styles.card }>
				<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Foto</Text>
				<View style={ [styles.row, { marginTop: 15 }] }>
					<Image source={ Images.OnBoarding[1] } style={ styles.images } resizeMethod='resize' resizeMode='cover' />
					<View style={ styles.addGallery }>
						<Images.IconeCameraRed width={ 20 } height={ 20 } />
						<Text format={ Fonts.textBody.s.bold as TextStyle } color={ Colors.company.red }>+Foto</Text>
					</View>
				</View>
			</View>
			<View style={ styles.card }>
				<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Video</Text>

				<Image source={ Images.OnBoarding[2] } style={ styles.video } resizeMethod='resize' resizeMode='cover' />
			</View>
			<Button
				onPress={ () => { formik.handleSubmit(); } }
				text='Simpan'
				textSize={ 14 }
				weight='700'
				mt={ 30 }
				useShadow={ true }
				disabled={ formik.values == formik.initialValues }
			/>
		</View>
	);
};

export default Complain;

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	row: {
		flexDirection: 'row'
	},
	card: {
		marginTop: 20
	},
	addGallery: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		width: 80,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: Colors.company.red,
		borderRadius: 5
	},
	images: {
		height: 80,
		width: 80,

		marginRight: 5,
		borderRadius: 5
	},
	video: {
		height: 167,
		width: 335,
		borderRadius: 5
	},
	header: {
		flexDirection: 'row'
	},
	headerLeftRight: {
		flex: 1
	},
	headerTitle: {
		flex: 10
	}
});