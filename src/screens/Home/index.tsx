import { Text, View } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/AntDesign';

import { Button, Container, Header } from '@components';
import { Colors } from '@constant';
import styles from './style';
import { NavigationHelper } from '@helpers';

const Home = () => {

	const showToast = (type: string) => {
		Toast.show({
			type,
			text1: 'Success',
			text2: 'Berhasil Menampilkan Toast',
		});
	};

	return (
		<Container noPaddingTop>
			<Header />
			<View style={ styles.container }>
				<Text>Home Screen</Text>

				<View style={ { marginTop: 10 } }>
					<Button
						onPress={ () => showToast('success') }
						text='Toast Success'
						type='outline'
						color={ Colors.alert.green } />
					<Button
						onPress={ () => showToast('error') }
						mt={ 10 }
						text='Toast Error'
						type='outline'
						color={ Colors.alert.red } />
					<Button
						onPress={ () => NavigationHelper.push('Contact') }
						text='Contact'
						mt={ 10 }
						color='white'
						textStyle={ { marginRight: 4 } } >
						<Icon
							name='contacts'
							color='white'
							size={ 14 } />
					</Button>
				</View>
			</View>
		</Container>
	);
};

export default Home;
