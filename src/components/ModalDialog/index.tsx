import {
	StyleSheet,  View, Modal, TouchableOpacity, TextStyle, ViewStyle, ScrollView
} from 'react-native';
import React from 'react';

import { Colors, Fonts, Images } from '@constant';

interface ModalDialogProps {
	visible: boolean,
	onRequestClose: React.Dispatch<React.SetStateAction<boolean>>,
	children: React.ReactNode,
	title?: string | undefined,
	iconStyle?: TextStyle;
	containerStyle?: ViewStyle;
}

const ModalDialog = ({
	visible, onRequestClose, children, title, iconStyle, containerStyle
}: ModalDialogProps) => {
	return (
		<Modal
			animationType='fade'
			visible={ visible }
			transparent
			onRequestClose={ () => onRequestClose(false) }
		>
			<ScrollView
				contentContainerStyle={ {
					flex: 1,
					justifyContent: 'center',
					backgroundColor: Colors.transparent.grey
				} }
				bounces={ false }
				showsVerticalScrollIndicator={ false }
				keyboardShouldPersistTaps={ 'handled' }
			>
				<View style={ { padding: 30 } }>
					<View style={ [styles.title, { paddingHorizontal: 20, justifyContent: 'flex-end' }] } >
						<TouchableOpacity
							onPress={ () => onRequestClose(false) }
							style={ styles.iconClose }
						>
							<Images.IconClose />
						</TouchableOpacity>
					</View>

					<View style={ styles.bottom }>
						{ children }
					</View>
				</View>

			</ScrollView>
		</Modal>
	);
};

export default ModalDialog;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white.background,
	},
	iconClose: {
		padding: 5,
	},
	titleText: {
		color: Colors.black.default,
		fontFamily: Fonts.type.bold,
		fontSize: Fonts.size.m,
		fontWeight: '700'
	},
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingHorizontal: 16,
		backgroundColor: Colors.white.pure,
		paddingTop: 20
	},
	bottom: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		backgroundColor: Colors.white.pure,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16
	}
});