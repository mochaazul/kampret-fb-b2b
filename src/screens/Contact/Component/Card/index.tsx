import { Text } from '@components';
import React from 'react';
import { Image, View } from 'react-native';

import { ContactInterface } from '@interfaces';
import styles from './styles';

const Card: React.FC<ContactInterface.ContactCard> = ({ data }) => {
	return (
		<View style={ styles.cardContainer }>
			<Image
				source={ {
					uri: data.picture.thumbnail,
				} }
				style={ styles.image }
			/>
			<View>
				<Text>
					{ `${data.name.title} ${data.name.first} ${data.name.last}` }
				</Text>
				<Text color='gray'>
					{ data.email }
				</Text>
			</View>
		</View>
	);
};

export default Card;
