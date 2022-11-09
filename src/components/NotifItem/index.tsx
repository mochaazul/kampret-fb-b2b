import React from "react";
import { TextStyle, View } from "react-native";

import { Colors, Fonts, Images } from "@constant";
import Button from "../Button";
import Text from "../Text";

import { styles } from "./style";

const Bullet = () => (<View style={ styles.bullet } />);

const NotifItem = () => (
	<View style={ styles.container }>
		<View style={ styles.row }>
			<Bullet />

			<View style={ { flex: 1, marginStart: 10 } }>
				<Text
					format={ Fonts.paragraph.m.regular as TextStyle }
					color={ Colors.black.default }
					style={ { backgroundColor: Colors.yellow.default, alignSelf: 'center' } }
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales mattis tincidunt orci vestibulum.
				</Text>

				<Text
					format={ Fonts.paragraph.s.regular as TextStyle }
					color={ Colors.gray.default }
					mt={ 8 }
				>
					Hari ini, 06:00 WIB
				</Text>
			</View>
		</View>

		<View style={ styles.line } />
	</View>
);

export default React.memo(NotifItem);