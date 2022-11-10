import React from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../Header';
import { ComponentInterface } from '@interfaces';
import { styles } from './styles';
import { Colors } from '@constant';

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
		header,
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
				behavior={ Platform.OS === "ios" ? "padding" : undefined }
			//keyboardVerticalOffset={ 30 }
			>
				{ noScroll && header &&
					<Header { ...header } />
				}
				{ noScroll ? (
					<View style={ [{ flex: 1, backgroundColor: Colors.white.background, paddingHorizontal: 20 }, contentContainerStyle] }>
						{ children }
					</View>
				) : (
					<ScrollView
						bounces={ false }
						showsVerticalScrollIndicator={ false }
						showsHorizontalScrollIndicator={ false }
						contentContainerStyle={ [
							{
								flexGrow: 1,
							},
							contentContainerStyle,
						] }
						keyboardShouldPersistTaps={ 'handled' }
						{ ...restOfProps }
					>
						{ header &&
							<Header { ...header } />
						}
						<View style={ { flex: 1, backgroundColor: Colors.white.background, paddingHorizontal: 20 } }>

							{ children }

						</View>

					</ScrollView>
				) }
			</KeyboardAvoidingView>
		</SafeAreaView >
	);
};

export default Container;
