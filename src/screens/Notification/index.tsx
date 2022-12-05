import React, {useEffect, useState} from "react";
import { FlatList, View } from "react-native";

import { Container, Header, NotifItem } from "@components";
import styles from "./style";
import { NavigationProps } from '@interfaces';

type NotificationProps = NavigationProps<'Notification'>

const Notification = ({route}:NotificationProps) => {

	const [arrSize, setArrSize] = useState(0)

	useEffect(() => {
		if(route.params?.item) {
			setArrSize(prevState => prevState + 1)
		}
	}, [route])
	

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
				data={ [...Array(arrSize).keys()] }
				renderItem={ ({ i }: any) => (<NotifItem key={ i } />) }
				ItemSeparatorComponent={ () => (<View style={ styles.line } />) }
			/>
		</Container>
	);
};

export default React.memo(Notification);