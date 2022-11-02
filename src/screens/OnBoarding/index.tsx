/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import {
	Animated, FlatList, Image, ImageSourcePropType, StatusBar, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Images, Colors } from '@constant';
import { NavigationHelper } from '@helpers';
import { Button, Text } from '@components';

import BulletIndicator from './Components/BulletIndicator';
import styles from './style';

const slider = [
	{
		key: 'one',
		title: 'Paxel',
		text: 'Application-based logistics startup that carries the same day delivery service with flat shipping costs.',
		image: Images.OnBoarding[1],
	}, {
		key: 'two',
		title: 'FreshBox',
		text: 'A box of freshness that will always be available to send to your home.',
		image: Images.OnBoarding[2],
	}, {
		key: 'three',
		title: 'Cimory',
		text: 'Cimory Group is a protein-based packaged food and beverage product manufacturer in Indonesia.',
		image: Images.OnBoarding[3],
	},
];

export interface ISlider {
	key: string;
	title: string;
	text: string;
	image: ImageSourcePropType;
}

const onBoardingItem = (item: ISlider) => {
	return (
		<View
			style={ styles.images_container }
			key={ item.key }>
			<View style={ styles.images_shadow } />
			<Image
				source={ item.image }
				style={ styles.images } />
		</View>
	);
};

const OnBoarding = () => {

	const [currentIndex, setCurrentIndex] = useState(0);

	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef<any>();
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any; }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const scrollNext = () => {
		if (currentIndex < slider.length - 1) {
			slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
		}
	};

	const scrollBack = () => {
		if (currentIndex > 0) {
			slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
		}
	};

	const scrollSkip = () => {
		slidesRef.current.scrollToIndex({ index: slider.length - 1 });
	};

	return (
		<View style={ styles.container }>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent' />
			<FlatList
				data={ slider }
				renderItem={ ({ item }) => onBoardingItem(item) }
				horizontal
				bounces={ false }
				scrollEventThrottle={ 16 }
				ref={ slidesRef }
				pagingEnabled
				onViewableItemsChanged={ viewableItemsChanged }
				viewabilityConfig={ viewConfig }
				onScroll={ Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false },
				) }
			/>
			{
				currentIndex !== slider.length - 1 && (
					<View style={ styles.text_skip_container } >
						<Button
							noPadding
							backgroundColor='transparent'
							onPress={ () => scrollSkip() }
							text='Skip for Now'
							color='white' />
					</View>
				)
			}
			<View style={ styles.sub_container }>
				<BulletIndicator
					data={ slider }
					scrollX={ scrollX } />
				<Images.LogoText style={ styles.logo } />
				<Text
					weight='700'
					size={ 24 }
					mt={ 24 }
					color={ Colors.black.default }>{ slider[currentIndex].title }</Text>
				<Text
					mt={ 10 }
					color={ Colors.gray.default }
					lineHeight={ 21 } >{ slider[currentIndex].text }</Text>
				<View
					style={ [styles.button_navigation, {
						justifyContent: currentIndex !== 0 ? 'space-between' : 'flex-end',
					}] }>
					{ currentIndex !== 0 && (
						<Button
							circle
							backgroundColor={ Colors.yellow.default }
							onPress={ () => scrollBack() }>
							<Icon
								name='arrow-back'
								size={ 20 }
								color={ Colors.black.default } />
						</Button>
					) }
					{
						currentIndex === slider.length - 1 ? (
							<Button
								onPress={ () => NavigationHelper.push('Login') }
								width={ 164 }
								text='Let’s Get Going'
								weight='700' />
						) : (
							<Button
								circle
								backgroundColor={ Colors.yellow.default }
								onPress={ () => scrollNext() }>
								<Icon
									name='arrow-forward'
									size={ 20 }
									color={ Colors.black.default } />
							</Button>
						)
					}
				</View>
			</View>
		</View >
	);
};

export default OnBoarding;
