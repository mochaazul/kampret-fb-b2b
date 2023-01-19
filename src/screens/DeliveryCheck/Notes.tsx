import { StyleSheet, View, TouchableOpacity, TextStyle } from 'react-native';
import React from 'react';
import { FormikProps, useFormik } from 'formik';

import { Images, Colors, Fonts } from '@constant';
import { Text, Input, Button } from '@components';
import { Auth } from '@validator';

interface NotesProps {
	onCreateNotes: (notes: string | null) => void;
}
const Notes = ({ onCreateNotes }: NotesProps) => {
	const formik: FormikProps<{ notes: string | null; }> = useFormik<{ notes: string | null; }>({
		validationSchema: Auth.NotesValidation,
		validateOnChange: false,
		validateOnBlur: false,
		initialValues: {
			notes: null
		},
		onSubmit: () => {
			onCreateNotes(formik.values.notes);
		}
	});

	return (

		<View style={ styles.container }>
			<Text format={ Fonts.heading.h3 as TextStyle }>Tambahkan Catatan</Text>
			<Input
				formik={ formik }
				name='notes'
				label='Tambahkan Notes (Opsional)'
				placeholder='Masukkan catatan...'
				keyboardType='ascii-capable'
				multiline={ true }
				numberOfLines={ 10 }
				mt={ 20 }
			/>
			<View style={ styles.box }>
				<Button
					onPress={ () => { formik.setFieldValue('notes', null); formik.handleSubmit(); } }
					backgroundColor='transparent'
					type='outline'
					text='Lewati'
					textSize={ 14 }
					weight='700'
					mt={ 30 }
					color={ Colors.company.red }

					loading={ false }
					buttonStyle={ { flex: 1, marginRight: 20 } }
				/>
				<Button
					onPress={ () => formik.handleSubmit() }
					text='Buat Catatan'
					textSize={ 14 }
					weight='700'
					mt={ 30 }

					loading={ false }
					style={ { flex: 1 } }
				/>
			</View>

		</View>
	);
};

export default Notes;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: -1,
		backgroundColor: Colors.gray.light
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	card: {
		marginTop: 20,
		backgroundColor: Colors.white.pure
	},
	header: {
		flexDirection: 'row',
		borderBottomColor: Colors.gray.line,
		borderBottomWidth: 1,
		marginVertical: 20,
		paddingBottom: 20
	},
	headerLeftRight: {
		flex: 1
	},
	headerTitle: {
		flex: 10
	},
	box: {
		flexDirection: 'row',
	}
});