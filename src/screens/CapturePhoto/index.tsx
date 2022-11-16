import {  Pressable, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Camera } from '@components';
import { useCameraDevices, Camera as CameraVision, CameraProps as CameraVisionProps } from 'react-native-vision-camera';
import { NavigationHelper } from '@helpers';

const CapturePhoto = () => {
  const cameraRef = useRef<CameraVision>(null);

  const onTakeCapture = useCallback(
		async() => {
			const result = await cameraRef?.current?.takePhoto({
				qualityPrioritization: 'quality',
			})

			NavigationHelper.replace('InputKms', {
        photo: "file://" + result?.path
      })
		},
		[cameraRef],
	)

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} photo={true} cameraRef={cameraRef} />
      <View style={styles.buttonWrapper}>
      <TouchableOpacity onPress={onTakeCapture} style={styles.button} />
      </View>
    </View>
  )
}

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
    left:0,
    right:0,
  },
  button: {
    width:50,
    height:50,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export default CapturePhoto