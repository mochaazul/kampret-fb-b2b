import {
	StyleSheet, Text, View, Modal, TouchableOpacity, TextStyle, ViewStyle, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Fonts } from '@constant';
import { Ratio } from '@helpers';

interface BottomSheetProps {
	visible: boolean,
	onRequestClose: React.Dispatch<React.SetStateAction<boolean>>,
	children: React.ReactNode,
	title?: string | undefined,
	iconStyle?: TextStyle;
	containerStyle?: ViewStyle;
}

const BottomSheet = ({
	visible, onRequestClose, children, title, iconStyle, containerStyle
}: BottomSheetProps) => {
	return (
		<Modal
			animationType='slide'
			visible={ visible }
			transparent
			onRequestClose={ () => onRequestClose(false) }

		>
			<ScrollView
				contentContainerStyle={ {
					flex: 1,
					justifyContent: 'flex-end',
					backgroundColor: Colors.transparent.default
				} }
				bounces={ false }
				showsVerticalScrollIndicator={ false }
				keyboardShouldPersistTaps={ 'handled' }
			>
				<TouchableOpacity style={ { backgroundColor: Colors.transparent.grey, flex: 1, bottom: -16, marginTop: -20 } }
					onPress={ () => onRequestClose(false) }
				/>
				{ title &&
					<View style={ [styles.title, containerStyle] } >
						<Text style={ styles.titleText }>{ title }</Text>
						<TouchableOpacity
							onPress={ () => onRequestClose(false) }
							style={ styles.iconClose }
						>
							<Ionicons
								name='md-close'
								color={ Colors.black.default }
								size={ 20 }
								style={ iconStyle }
								onPress={ () => onRequestClose(false) }
							/>
						</TouchableOpacity>
					</View>
				}
				<View style={ styles.bottom }>
					{ children }
				</View>
			</ScrollView>
		</Modal>
	);
};

export default BottomSheet;

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
		paddingVertical: 16,
		backgroundColor: Colors.white.pure,
	},
	bottom: {
		paddingBottom: 20,
		backgroundColor: Colors.white.pure,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	}
});