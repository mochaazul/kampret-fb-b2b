import { Actions } from '@store';
import { useEffect, useState } from 'react';
import OneSignal, { OpenedEvent } from 'react-native-onesignal';
import { ScreenNameType } from 'src/router/screens';
import { useAppDispatch, useAppSelector } from './hooks';
import { navigationRef, reset } from './navigationHelper';

const useLinking = () => {
	const [openedEvent, setOpenedEvent] = useState<OpenedEvent>();
	const setNotif = useAppDispatch(Actions.miscAction.setNotif);
	const userSelector = useAppSelector(state => state.authReducers);

	useEffect(() => {
		OneSignal.setNotificationOpenedHandler(opened => {

			if (userSelector.user?.token) {
				// TODO, BE will be provide the data
				setOpenedEvent(opened);
				const screenName = navigationRef.getCurrentRoute()?.name as ScreenNameType;
				if (screenName !== 'Delivery') {
					reset('Delivery');
				}

			}
		});
	}, [userSelector]);

	return {
		openedEvent
	};
};

export default useLinking;