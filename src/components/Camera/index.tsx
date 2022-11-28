import React, { useMemo, ReactNode, Fragment } from 'react';
import { useCameraDevices, Camera as CameraVision, CameraProps as CameraVisionProps } from 'react-native-vision-camera';
import Text from '../Text/index';
import Reanimated from 'react-native-reanimated';

const ReanimatedCamera = Reanimated.createAnimatedComponent(CameraVision);
Reanimated.addWhitelistedNativeProps({
	zoom: true,
});


interface CameraType extends Omit<CameraVisionProps, 'isActive' | 'device'> {
	notFoundCameraComponent?: ReactNode;
	isActive?: boolean;
	cameraRef?: React.RefObject<CameraVision>;
}

const photoQuality = {
	photoCodec: 'jpeg',
	qualityPrioritization: 'speed',
	flash: false,
	quality: 90,
	skipMetadata: true,
};


const Camera = ({ notFoundCameraComponent, frameProcessor, isActive = true, photo, cameraRef, ...props }: CameraType) => {
	const devices = useCameraDevices();
	const device = devices.back;

	const renderCamera = useMemo(() => {
		if (device) {
			return (
				<ReanimatedCamera ref={ cameraRef } photo frameProcessor={ frameProcessor } isActive={ isActive } device={ device } { ...props } />
			);
		} else {
			if (notFoundCameraComponent) {
				return notFoundCameraComponent;
			}
			return (
				<Text weight='700' size={ 16 } lineHeight={ 18 } align='center' style={ { flex: 5 } }>Camera not found</Text>
			);
		}

	}, [device]);

	return (
		<Fragment>
			{ renderCamera }
		</Fragment>
	);
};

export default Camera;