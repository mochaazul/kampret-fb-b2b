import React from "react";
import { FlatList, View } from "react-native";

import { Container, Header, NotifItem } from "@components";
import styles from "./style";

const Notification = () => {
	return (
		<Container noPaddingTop noPaddingBottom noScroll>
			<Header />

			<FlatList
				bounces={ false }
				style={ styles.container }
				contentContainerStyle={ styles.content }
				showsVerticalScrollIndicator={ false }
				data={ [...Array(10).keys()] }
				renderItem={ ({ i }: any) => (<NotifItem key={ i } />) }
				ItemSeparatorComponent={ () => (<View style={ { height: 16 } } />) }
			/>
		</Container>
	);
};

export default Notification;