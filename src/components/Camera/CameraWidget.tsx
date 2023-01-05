import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity,  Modal} from 'react-native';

import { Camera } from '@components';
import { Camera as CameraVision , PhotoFile} from 'react-native-vision-camera';

type CameraWidgetProps = {
  isActive: boolean,
  onCapture: (photo:PhotoFile) => void;
  onClose: () => void;
}

const CameraWidget:React.FC<CameraWidgetProps> = ({
  isActive, 
  onCapture,
  onClose,
  ...props
}) => {

  const [isOpen, setOpen] = useState<boolean>(false)

  useEffect(()=>{
    setOpen(isActive)
  },[isActive])

  useEffect(()=>{
    if(!isOpen) onClose()
  },[isOpen])

  const cameraRef = useRef<CameraVision>(null)

  
  const onPress = async () => {
    if(cameraRef.current){
      const capturedImg = await cameraRef.current.takePhoto({
        qualityPrioritization:'quality'
      })
      onCapture(capturedImg)
    }
    setOpen(false)
  }
	return (
		<Modal 
      visible={ isOpen }
    >
      <Camera 
				style={ [StyleSheet.absoluteFill, { flex: 1 }] }
				photo={ true }
        cameraRef={cameraRef}

				/>
			<View style={ styles.buttonWrapper }>
				<TouchableOpacity onPress={ onPress } style={ styles.button } />
			</View>
		</Modal>
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

export default CameraWidget;