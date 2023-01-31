import React from "react";
import { TextStyle, View, TouchableOpacity } from "react-native";
import moment from "moment";

import { Colors, Fonts } from "@constant";
import Text from "../Text";
import { NotificationInterface } from "@interfaces";

import { styles } from "./style";

interface NotifItemProps {
	item: NotificationInterface.Notification,
	onClick: (id: number) => void;
}
const Bullet = () => (<View style={ styles.bullet } />);

const NotifItem = ({ item, onClick }: NotifItemProps) => {
	return (

		<TouchableOpacity style={ styles.container } onPress={ () => onClick(item.id) }>
			<View style={ styles.row }>
				{ !item.is_read && <Bullet /> }
				<View style={ styles.content }>
					<Text
						format={ Fonts.paragraph.m.regular as TextStyle }
						color={ Colors.black.default }
					>
						{ '[' + item.title + '] ' + item.detail }
					</Text>

					<Text
						format={ Fonts.paragraph.s.regular as TextStyle }
						color={ Colors.gray.default }
						mt={ 8 }
					>
						{ moment(item.date).fromNow() }
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(NotifItem);