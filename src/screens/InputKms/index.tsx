import React, { useCallback, useMemo } from "react";
import { TextStyle, TouchableOpacity, View, Image } from "react-native";

import { Button, Container, Input, Text } from "@components";
import styles from "./style";
import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper } from "@helpers";
import { NavigationProps } from '@interfaces';

type InputKmsScreenProps = NavigationProps<'InputKms'>;

const InputKms = ({route, navigation}:InputKmsScreenProps) => {

	const navigateToCapturePhoto = useCallback(
		() => {
			NavigationHelper.push('CapturePhoto')
		},
		[],
	)

const renderImage =  useMemo(() => {
	if(route && route.params?.photo) {
			return (
				<Image style={styles.addImage} source={{uri: route.params?.photo }} />
			)
	}

	return (
		<View style={ styles.addImage }>
			<Images.IconCamera />

			<Text
				format={ Fonts.textBody.l.bold as TextStyle }
				color={ Colors.gray.default }
				mt={ 20 }
				>
				+ Tambah Foto
			</Text>
		</View>
	)
}, [route])
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
				label="KM Kendaraan"
				mt={ 16 }
			/>

			<Text
				format={ Fonts.textBody.l.bold as TextStyle }
				color={ Colors.black.default }
				mt={ 20 }
			>
				Foto KM Kendaraan
			</Text>

			<TouchableOpacity
				activeOpacity={ .75 }
				onPress={navigateToCapturePhoto}
			>
				{renderImage}

			</TouchableOpacity>

			<Button
				onPress={ undefined }
				text='Lanjutkan'
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