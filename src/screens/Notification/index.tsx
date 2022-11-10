import React from "react";
import { FlatList, View } from "react-native";

import { Container, Header, NotifItem } from "@components";
import styles from "./style";
import { Colors } from "@constant";

const Notification = () => {
	return (
		<Container
			noPadding
			noScroll
			header={ { type: 'regular', title: 'Notifikasi' } }
			contentContainerStyle={ styles.container }
		>

			<FlatList
				bounces={ false }
				contentContainerStyle={ styles.content }
				showsVerticalScrollIndicator={ false }
				data={ [...Array(10).keys()] }
				renderItem={ ({ i }: any) => (<NotifItem key={ i } />) }
				ItemSeparatorComponent={ () => (<View style={ styles.line } />) }
			/>
		</Container>
	);
};

export default Notification;