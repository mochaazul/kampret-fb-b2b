import React from 'react';
import { View, Animated } from 'react-native';

import { Ratio } from '@helpers';
import { Colors } from '@constant';

import styles from '../style';
import { ISlider } from '..';

interface IBulletIndicator {
	data: ISlider[];
	scrollX: Animated.Value;
}

const BulletIndicator: React.FC<IBulletIndicator> = ({ data, scrollX }) => {
	return (
		<View style={ styles.indicator_container }>
			{
				data.map((e, i) => {
					const inputRange = [(i - 1) * Ratio.screenWidth, i * Ratio.screenWidth, (i + 1) * Ratio.screenWidth];
					const dotWidth = scrollX.interpolate({
						inputRange,
						outputRange: [4, 22, 4],
						extrapolate: 'clamp',
					});
					const dotColor = scrollX.interpolate({
						inputRange,
						outputRange: [Colors.gray.default, Colors.yellow.default, Colors.gray.default],
						extrapolate: 'clamp',
					});
					return (
						<Animated.View
							key={ e.key }
							style={ [styles.dot, {
								width: dotWidth,
								backgroundColor: dotColor,
							}] }
						/>
					);
				})
			}
		</View>
	);
};

export default BulletIndicator;
