import { StyleSheet, TextStyle, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { FormikProps, useFormik } from 'formik';

import { Input, Button, Text, Dropdown } from '@components';
import { Auth } from '@validator';
import { Colors, Fonts, Images } from '@constant';
interface ComplainProps {
	onClose: () => void;
}
interface IComplain {
	description: string | null;
}

const dummyDropdown = [
	{ key: '1', value: 'Salah Jenis' },
	{ key: '2', value: 'Warna Salah' },
	{ key: '3', value: 'Salah Barang' },
	{ key: '4', value: 'Busuk' },
	{ key: '5', value: 'Jumlah Lebih' },
	{ key: '6', value: 'Jumlah Kurang' },
	{ key: '8', value: 'Rusak' },
];

const Complain = ({ onClose }: ComplainProps) => {
	const [qty, setQty] = useState<number>(2);
	const [complainSelected, setComplainSelected] = useState('');

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
	const handleMinusButtonClicked = () => {
		if (qty >= 1) setQty(qty - 1);
	};
	const handlePlusButtonClicked = () => {
		setQty(qty + 1);
	};
	return (
		<View style={ styles.container }>
			<View style={ styles.header }>
				<View style={ styles.headerLeftRight } />
				<Text size={ 16 } lineHeight={ 18 } weight='700' align='center' style={ styles.headerTitle }>Keluhan</Text>
				<TouchableOpacity style={ styles.headerLeftRight } onPress={ () => onClose() }>
					<Images.IconClose />
				</TouchableOpacity>
			</View>
			<ScrollView contentContainerStyle={ styles.scroll } showsVerticalScrollIndicator={ false }>
				<Text format={ Fonts.textBody.l.bold as TextStyle }>Kategori Keluhan</Text>
				<Dropdown
					boxStyles={ { marginTop: 5 } }
					setSelected={ val => val ? setComplainSelected(val) : null }
					defaultOption={ { key: '8', value: 'Rusak' } }
					data={ dummyDropdown }
					save="value"
				/>
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
					<View style={ [styles.row, styles.counter] }>
						<TouchableOpacity onPress={ () => handleMinusButtonClicked() }>
							<Images.IconMinus />
						</TouchableOpacity>

						<View style={ { marginHorizontal: 20 } }>
							<Text format={ Fonts.textBody.l.bold as TextStyle }>{ qty }</Text>
						</View>
						<TouchableOpacity onPress={ () => handlePlusButtonClicked() }>
							<Images.IconPlus />
						</TouchableOpacity>

					</View>

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
			</ScrollView>
		</View>
	);
};

export default Complain;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: -1
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
		flexDirection: 'row',
		borderBottomColor: Colors.gray.line,
		// borderBottomWidth: 1,
		marginVertical: 20
	},
	headerLeftRight: {
		flex: 1
	},
	headerTitle: {
		flex: 10
	},
	counter: {
		marginTop: 20,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	scroll: {
		paddingBottom: 30
	}
});