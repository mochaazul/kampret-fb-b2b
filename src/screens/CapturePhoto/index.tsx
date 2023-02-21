import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Camera as CameraVision } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

import { Camera } from '@components';
import { NavigationHelper, useAppDispatch, sentryReporter, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { NavigationProps } from '@interfaces';
import { Variables } from '@constant';

const CapturePhoto = ({ route }: NavigationProps<'CapturePhoto'>) => {
	const cameraRef = useRef<CameraVision>(null);

	const user = useAppSelector(state => state.authReducers.user);

	const setTmpImgUri = useAppDispatch(Actions.miscAction.setTmpImageUri);
	const setCustomStore = useAppDispatch(Actions.miscAction.setTmpMultiplePhotoCapture);

	const [active, setActive] = useState(true);

	const onTakeCapture = useCallback(
		async () => {
			const result = await cameraRef?.current?.takePhoto({
				qualityPrioritization: 'quality',
				skipMetadata: true
			});

			if (route.params?.customStore) {
				// multiple image capture scenario
				if (!route.params.customStore.currentStore) {
					setCustomStore({
						[route.params.customStore.id]: Platform.OS === "ios" ?
							decodeURIComponent(result?.path ?? '') :
							"file://" + result?.path
					});
				} else if (route.params.customStore.currentStore[route.params.customStore.id]) {
					const modifiedObj = {
						...Actions, [route.params.customStore.id]: Platform.OS === "ios" ?
							decodeURIComponent(result?.path ?? '') :
							"file://" + result?.path
					};
					setCustomStore(modifiedObj);
				} else {
					let modifiedObj = route.params.customStore.currentStore;
					modifiedObj[route.params.customStore.id] = Platform.OS === "ios" ?
						decodeURIComponent(result?.path ?? '') :
						"file://" + result?.path;
				}

			}

			setTmpImgUri(
				Platform.OS === "ios" ?
					decodeURIComponent(result?.path ?? '') :
					"file://" + result?.path
			);

			if (result && result.height !== Variables.PHOTO_SIZE.HEIGHT) {
				sentryReporter.imageWatcher(user ? user.user_name : 'uknown', result.height, result.width);
			} else if (result && result.width !== Variables.PHOTO_SIZE.WIDTH) {
				sentryReporter.imageWatcher(user ? user.user_name : 'uknown', result.height, result.width);
			}
			NavigationHelper.pop(1);

		},
		[cameraRef],
	);

	const navigation = useNavigation();
	const setInactive = () => setActive(false);

	useEffect(() => {
		navigation.addListener('beforeRemove', setInactive);

		return () => navigation.removeListener('beforeRemove', setInactive);
	}, [navigation]);

	return (
		<View style={ styles.container }>
			<Camera
				style={ StyleSheet.absoluteFill }
				photo={ true }
				cameraRef={ cameraRef }
				isActive={ active }
				format={ {
					photoHeight: Variables.PHOTO_SIZE.HEIGHT,
					photoWidth: Variables.PHOTO_SIZE.WIDTH,
					videoHeight: Variables.PHOTO_SIZE.HEIGHT,
					videoWidth: Variables.PHOTO_SIZE.WIDTH,
					isHighestPhotoQualitySupported: false,
					maxISO: 1500,
					minISO: 100,
					fieldOfView: 128,
					colorSpaces: ['yuv'],
					supportsPhotoHDR: true,
					supportsVideoHDR: false,
					frameRateRanges: [{ minFrameRate: 70, maxFrameRate: 100 }],
					autoFocusSystem: 'phase-detection',
					videoStabilizationModes: ['standard'],
					pixelFormat: '420v',
					maxZoom: 3
				} }
			/>

			<View style={ styles.buttonWrapper }>
				<TouchableOpacity onPress={ onTakeCapture } style={ styles.button } />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	text: {
		color: 'white',
		fontSize: 11,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonWrapper: {
		position: 'absolute',
		bottom: 50,
		left: 0,
		right: 0,
	},
	button: {
		width: 50,
		height: 50,
		borderRadius: 100,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
});

export default CapturePhoto;