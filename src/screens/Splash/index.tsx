/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { View } from 'react-native';
import codePush from 'react-native-code-push';
import { ProgressBar } from '@react-native-community/progress-bar-android';

import { NavigationHelper, Ratio, useAppDispatch, useAppSelector } from '@helpers';
import { Images, Colors } from '@constant';
import styles from './style';
import { Actions } from '@store';

const Splash = () => {

	const setDeviceHeight = useAppDispatch(Actions.miscAction.setDeviceHeight);
	const userReducer = useAppSelector(state => state.authReducers.user);

	const [downloadProgress, setDownloadProgress] = useState(0);
	const [updateStatus, setUpdateStatus] = useState<string | null>(null);

	const updateStatusWrapper = (status: number) => {
		let statusLabel = 'wait';
		switch (status) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				statusLabel = 'Checking for updates.';
				break;
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
				statusLabel = 'downloading';
				// updatePage = true
				break;
			case codePush.SyncStatus.INSTALLING_UPDATE:
				statusLabel = 'installing';
				// updatePage = true
				break;
			case codePush.SyncStatus.UPDATE_INSTALLED:
				statusLabel = 'installed';
				break;
			case codePush.SyncStatus.UP_TO_DATE:
				statusLabel = 'Up-to-date.';

				break;
			default:
				break;
		}
		setUpdateStatus(statusLabel);
	};

	useEffect(() => {

		setDeviceHeight(Ratio.getDeviceHeight());

		const startup = async () => {
			try {
				let isUpdated = await codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE },
					status => updateStatusWrapper(status),
					({ receivedBytes, totalBytes }) => setDownloadProgress(receivedBytes / totalBytes)
				);
				console.log('innitiate', updateStatus, isUpdated, 'condition');

			} catch (error) {
				console.log('splash error', error);
			}
		};

		startup();
		// save timeoutId to clear the timeout when the component re-renders
		// const tm = setTimeout(() => {
		// 	if (userReducer) {
		// 		NavigationHelper.reset('Delivery');
		// 	} else {
		// 		NavigationHelper.reset('Login');
		// 	}

		// }, 1500);

		// clear timeout on re-render to avoid memory leaks
		return () => {
			//clearTimeout(tm);
		};
	}, []);

	const renderProgressBar = useMemo(() => {
		console.log('down', downloadProgress);
		return (
			<ProgressBar
				styleAttr='Horizontal'
				indeterminate={ false }
				progress={ downloadProgress }
				color={ Colors.company.red }
				style={ styles.progressBar }
			/>
		);
	}, [downloadProgress]);

	return (
		<View style={ styles.container }>
			<Images.LogoFB />
			{ renderProgressBar }
		</View>
	);
};

export default Splash;
