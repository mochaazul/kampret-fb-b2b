import { Colors, Fonts, Images } from "@constant";
import React from "react";
import { TextStyle, View } from "react-native";
import Button from "../Button";
import Text from "../Text";

import { styles } from "./style";

const index = () => (
	<View style={ styles.container }>
		<View style={ styles.row }>
			<Text
				format={ Fonts.paragraph.xl.bold as TextStyle }
				color={ Colors.black.default }
			>
				DE12345678
			</Text>

			<Images.More />
		</View>

		<View style={ styles.line } />

		<View style={ styles.rowContent } >
			<Images.IconLocation
				width={ 16 }
				height={ 16 }
				style={ { marginEnd: 12 } } />

			<Text
				format={ Fonts.paragraph.m.regular as TextStyle }
				color={ Colors.black.default }
			>
				3 Lokasi
			</Text>
		</View>

		<View style={ styles.rowContent } >
			<Images.IconTime
				width={ 16 }
				height={ 16 }
				style={ { marginEnd: 12 } } />

			<Text
				format={ Fonts.paragraph.m.regular as TextStyle }
				color={ Colors.black.default }
			>
				29-09-2022, 07:00 - 12:00 WIB
			</Text>
		</View>

		<View style={ [styles.row, { marginTop: 24 }] }>
			<View>
				<Text
					format={ Fonts.paragraph.m.regular as TextStyle }
					color={ Colors.gray.default }
				>
					Total Barang
				</Text>

				<Text
					format={ Fonts.paragraph.xl.bold as TextStyle }
					color={ Colors.black.default }
				>
					25 Barang
				</Text>
			</View>

			<Button
				text='Validasi Client ID'
				textSize={ 14 }
				weight='700'
				useShadow={ true }
				leadingIcon={ <Images.IconScan style={ { marginEnd: 4 } } /> }
				buttonStyle={ { paddingHorizontal: 20, paddingVertical: 10 } }
			/>
		</View>

	</View>
);

export default index;