import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { Container, NotifItem } from "@components";
import styles from "./style";
import { NavigationProps, NotificationInterface } from '@interfaces';
import { useAppSelector, useAppDispatch } from "@helpers";
import { Actions } from '@store';

type NotificationProps = NavigationProps<'Notification'>;

const Notification = ({ route }: NotificationProps) => {

	const [arrSize, setArrSize] = useState(0);

	const notificationList = useAppSelector(state => state.notificationReducers.notification);
	const latestNotifReaded = useAppSelector(state => state.notificationReducers.latestNotifReaded);
	const nextPage = useAppSelector(state => state.notificationReducers.next);
	const prevPage = useAppSelector(state => state.notificationReducers.prev);

	const readNotif = useAppDispatch(Actions.notificationAction.notificationReaded);

	useEffect(() => {
		if (route.params?.item) {
			setArrSize(prevState => prevState + 1);
		}
	}, [route]);

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
				data={ notificationList?.notifications }
				extraData={ latestNotifReaded }
				renderItem={ ({ item, index }) => (
					<NotifItem key={ item.id } item={ item } onClick={ (notifId) => readNotif(notifId) } />
				) }
				ItemSeparatorComponent={ () => (<View style={ styles.line } />) }
			/>
		</Container>
	);
};

export default React.memo(Notification);