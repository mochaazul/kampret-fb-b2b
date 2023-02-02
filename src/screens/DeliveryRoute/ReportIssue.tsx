import { StyleSheet, TextStyle, View, Image, ScrollView, ViewStyle, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { Input, Button, Text, Dropdown } from '@components';
import { Auth } from '@validator';
import { Colors, Fonts, Images } from '@constant';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { DeliveryInterface } from '@interfaces';

interface ComplainProps {
	deliveryId: string;
	onClose: () => void;
	onClickCamera: () => void;
}

const ReportIssue = ({ deliveryId, onClose, onClickCamera }: ComplainProps) => {

	const { t: translate } = useTranslation();

	const issueOptions = [
		{ key: '1', value: translate('deliveryReport.reason1') },
		{ key: '2', value: translate('deliveryReport.reason2') },
		{ key: '3', value: translate('deliveryReport.reason3') },
		{ key: '4', value: translate('deliveryReport.reason4') },
	];

	const loading = useAppSelector(state => state.deliveryReducers.loadingDeliveryIssue);
	const result = useAppSelector(state => state.deliveryReducers.resultDeliveryIssue);
	const previewImgURI = useAppSelector(state => state.miscReducers.tmpImageUri);

	const submitIssue = useAppDispatch(Actions.deliveryAction.submitDeliveryIssue);
	const setResult = useAppDispatch(Actions.deliveryAction.setDeliveryIssueResult);

	const formik: FormikProps<DeliveryInterface.IComplain> = useFormik<DeliveryInterface.IComplain>({
		validateOnBlur: true,
		validationSchema: Auth.ReportIssueValidation,
		initialValues: {
			title: issueOptions[0].value,
			description: '',
			image: previewImgURI ?? '',
		},
		onSubmit: () => {
			submitIssue(deliveryId, formik.values);
		},
	});

	const [btnDisable, setBtnDisable] = useState(!formik.isValid || formik.initialValues == formik.values);

	useEffect(() => {
		if (result != undefined) {
			onClose();
			setResult(undefined);
		}
	}, [result]);

	const renderImage = useMemo(() => {
		if (previewImgURI) {
			formik.setFieldValue('image', previewImgURI);
			setBtnDisable(!formik.isValid);
			return (
				<Image style={ styles.addImage } source={ { uri: previewImgURI } } />
			);
		}

		return (
			<View style={ styles.addImage }>
				<Images.IconCamera />
				<Text
					format={ Fonts.textBody.l.bold as TextStyle }
					color={ Colors.gray.default }
					mt={ 20 }>
					+ { translate('deliveryReport.addPhoto') }
				</Text>
			</View>
		);
	}, [previewImgURI]);

	const renderButton = useMemo(() => {
		return (
			<Button
				onPress={ () => formik.handleSubmit() }
				text={ translate('deliveryReport.sendReport') }
				textSize={ 14 }
				weight='700'
				mt={ 30 }
				useShadow={ true }
				// disabled={ btnDisable }
				loading={ loading }
			/>
		);
	}, [loading, btnDisable]);


	return (
		<View style={ styles.container }>
			<View style={ styles.header }>
				<Text format={ Fonts.heading.h3 as TextStyle }>{ translate('deliveryReport.report') }</Text>
			</View>
			<ScrollView contentContainerStyle={ styles.scroll } showsVerticalScrollIndicator={ false }>
				<Text format={ Fonts.textBody.l.bold as TextStyle }>{ translate('deliveryReport.problem') }</Text>

				<Dropdown
					boxStyles={ { marginTop: 5 } }
					setSelected={ (val) => {
						if (!issueOptions.map((o) => o.value).includes(val ?? '')) return;

						formik.setFieldValue('title', val);
						setBtnDisable(!formik.isValid);
					} }
					defaultOption={ issueOptions[0] }
					data={ issueOptions }
					save="value"
					inputStyles={ styles.dropdownText as ViewStyle }
					dropdownTextStyles={ styles.dropdownText as ViewStyle }
				/>

				<Input
					formik={ formik }
					name='description'
					label={ translate('deliveryReport.desc') }
					placeholder={ translate('deliveryReport.inputDesc') ?? 'Masukkan Deskripsi' }
					keyboardType='ascii-capable'
					multiline={ true }
					numberOfLines={ 5 }
					mt={ 20 }
					textAlignVertical='top'
				/>

				<View style={ styles.card }>
					<Text format={ Fonts.textBody.l.bold as TextStyle }>{ translate('deliveryReport.photo') }</Text>

					<TouchableOpacity
						activeOpacity={ .75 }
						onPress={ onClickCamera }
					>
						{ renderImage }
					</TouchableOpacity>
				</View>

				{ renderButton }
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
	},
	dropdownText: {
		color: Colors.black.default
	},
	addImage: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
		paddingHorizontal: 20,
		paddingTop: 48,
		paddingBottom: 32,
		borderRadius: 12,
		borderColor: Colors.gray.default,
		borderStyle: 'dashed',
		borderWidth: 1,
		height: 167
	},
});