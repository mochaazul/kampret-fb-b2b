import React, { useCallback, useMemo, useState } from "react";
import { TextStyle, TouchableOpacity, View, Image } from "react-native";
import { useTranslation } from 'react-i18next';

import { Button, Container, Input, Text } from "@components";
import styles from "./style";
import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper } from "@helpers";
import { NavigationProps } from '@interfaces';

type InputKmsScreenProps = NavigationProps<'InputKms'>;

const InputKms = ({ route }: InputKmsScreenProps) => {

	const { t } = useTranslation();
	const navigateToCapturePhoto = useCallback(
		() => {
			NavigationHelper.push('CapturePhoto');
		},
		[],
	);

	const renderImage = useMemo(() => {
		if (route && route.params?.photo) {
			return (
				<Image style={ styles.addImage } source={ { uri: route.params?.photo } } />
			);
		}

		return (
			<View style={ styles.addImage }>
				<Images.IconCamera />
				<Text
					format={ Fonts.textBody.l.bold as TextStyle }
					color={ Colors.gray.default }
					mt={ 20 }>
					+ { t('inputKM.addPhoto') }
				</Text>
			</View>
		);
	}, [route]);

	return (
		<Container
			noPadding
			noScroll
			header={
				{
					type: 'regular',
					title: 'Input KM Kendaraan',
					showLeftButton: false,
					rightButton: <Images.IconClose />,
					onPressRightButton: () => NavigationHelper.pop(1)
				}
			}
			contentContainerStyle={ { backgroundColor: Colors.white.pure } }
		>

			<Input
				name="input_km"
				label={ t('inputKM.vehicleBarometer') }
				mt={ 16 }
			/>

			<Text
				format={ Fonts.textBody.l.bold as TextStyle }
				color={ Colors.black.default }
				mt={ 20 }
			>
				{ t('inputKM.photo') }
			</Text>

			<TouchableOpacity
				activeOpacity={ .75 }
				onPress={ navigateToCapturePhoto }
			>
				{ renderImage }

			</TouchableOpacity>

			<Button
				onPress={ undefined }
				text={ t('actions.continue') }
				textSize={ 14 }
				weight='700'
				mt={ 30 }
				useShadow={ true }
				disabled={ true }
			/>
		</Container >
	);
};

export default InputKms;
