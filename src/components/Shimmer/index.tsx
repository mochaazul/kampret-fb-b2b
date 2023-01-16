import { Animated, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

interface SkeletonInterface {
	active?: boolean;
	children?: React.ReactNode | any;
	width?: number;
	height?: number;
	borderRadius?: number;
	backgroundColor?: string;
	highlightColor?: string;
	animate?: boolean;
	mt?: number;
	mr?: number;
	mb?: number;
	ml?: number;
	m?: string;
	style?: Object | any;
}

const Skeleton = (props: SkeletonInterface) => {
	const {
		active = true,
		children,
		width = 100,
		height = props.style?.fontSize || 12,
		borderRadius = 5,
		backgroundColor = '#D8D8D8',
		highlightColor = '#4444',
		animate = true,
		mt,
		mr,
		mb,
		ml,
		m,
		style
	} = props;

	const propsStyle = {
		width,
		height,
		borderRadius,
		marginTop: mt,
		marginRight: mr,
		marginBottom: mb,
		marginLeft: ml,
		margin: m
	};

	const [animation] = useState(new Animated.Value(0));

	useEffect(() => {
		if (animate) {
			const animate = () => {
				Animated.timing(animation, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: false
				}).start(() => {
					Animated.timing(animation, {
						toValue: 0,
						duration: 1000,
						useNativeDriver: false
					}).start(() => animate());
				});
			};

			animate();
		}
	}, [animate]);

	const interpolation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [backgroundColor, highlightColor]
	});

	const animatedStyle = { backgroundColor: interpolation };

	if (!active) {
		return children;
	}

	return (
		<Animated.View style={ [
			animatedStyle,
			propsStyle,
			style
		] } />
	);
};

export default Skeleton;
