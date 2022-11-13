import React, { } from "react";
import { TextStyle, TouchableOpacity, View } from "react-native";

import { Button, Container, Input, Text } from "@components";
import styles from "./style";
import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper } from "@helpers";

const InputKms = () => {
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
			>
				<View style={ styles.addImage }>
					<Images.IconCamera />

					<Text
						format={ Fonts.textBody.l.bold as TextStyle }
						color={ Colors.gray.default }
						mt={ 20 }>
						+ Tambah Foto
					</Text>
				</View>

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