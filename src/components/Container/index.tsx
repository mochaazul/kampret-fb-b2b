import React from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComponentInterface } from '@interfaces';
import { styles } from './styles';

const Container: React.FC<ComponentInterface.IContainer> = props => {

	const {
		noPadding,
		noPaddingTop,
		noPaddingBottom,
		noPaddingLeft,
		noPaddingRight,
		noPaddingVertical,
		noPaddingHorizontal,
		barStyle = 'dark-content',
		contentContainerStyle,
		noScroll,
		children,
		...restOfProps
	} = props;

	return (
		<SafeAreaView
			style={
				styles.customStyle.defaultStyle(
					noPadding,
					noPaddingTop,
					noPaddingBottom,
					noPaddingLeft,
					noPaddingRight,
					noPaddingVertical,
					noPaddingHorizontal
				)
			}>

			<StatusBar
				barStyle={ barStyle }
				translucent
				backgroundColor="transparent"
			/>

			<KeyboardAvoidingView
				style={ { flex: 1 } }
				behavior={ Platform.OS === "ios" ? "padding" : "height" }
				keyboardVerticalOffset={ 30 }
			>
				{ noScroll ? (
					<View style={ [{ flex: 1 }, contentContainerStyle] }>
						{ children }
					</View>
				) : (
					<ScrollView
						bounces={ false }
						showsVerticalScrollIndicator={ false }
						showsHorizontalScrollIndicator={ false }
						contentContainerStyle={ [
							{
								flexGrow: 0,
							},
							contentContainerStyle,
						] }
						{ ...restOfProps }
					>
						<View style={ { flex: 1 } }>
							{ children }
						</View>
					</ScrollView>
				) }
			</KeyboardAvoidingView>
		</SafeAreaView >
	);
};

export default Container;
