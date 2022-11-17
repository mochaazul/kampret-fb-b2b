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
	{ key: '1', value: 'Macet' },
	{ key: '2', value: 'Hujan' },
	{ key: '3', value: 'Mendung' },
	{ key: '4', value: 'Gerimis' },
];

const ReportIssue = ({ onClose }: ComplainProps) => {
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
				<Text format={ Fonts.heading.h3 as TextStyle }>Laporan</Text>
			</View>
			<ScrollView contentContainerStyle={ styles.scroll } showsVerticalScrollIndicator={ false }>
				<Text format={ Fonts.textBody.l.bold as TextStyle }>Masalah</Text>
				<Dropdown
					boxStyles={ { marginTop: 5 } }
					setSelected={ val => val ? setComplainSelected(val) : null }
					defaultOption={ { key: '4', value: 'Gerimis' } }
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
					<Text format={ Fonts.textBody.l.bold as TextStyle }>Bukti Foto</Text>

					<Image source={ Images.OnBoarding[2] } style={ styles.video } resizeMethod='resize' resizeMode='cover' />
				</View>
				<Button
					onPress={ () => { formik.handleSubmit(); } }
					text='Kirim Laporan'
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

export default ReportIssue;

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