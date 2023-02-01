import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Modal, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { Colors, Images } from "@constant";
import { NavigationHelper, useAppDispatch, useAppSelector, useScanBarcodes } from "@helpers";
import { BottomSheet, Camera, Text } from "@components";
import { useNavigation } from "@react-navigation/native";
import { Actions } from "@store";
import { NavigationProps } from "@interfaces";

const ScanBarcode = ({ route }: NavigationProps<'ScanBarcode'>) => {
	const [cameraActive, setActive] = useState(true);
	const [loading, setLoading] = useState(false);

	const result = useAppSelector(state => state.deliveryReducers.resultValidateClient);

	const validateClient = useAppDispatch(Actions.deliveryAction.validateClient);

	const navigation = useNavigation();
	const setInactive = () => setActive(false);

	useEffect(() => {
		navigation.addListener('beforeRemove', setInactive);

		return () => navigation.removeListener('beforeRemove', setInactive);
	}, [navigation]);

	useEffect(() => {
		if (result != undefined)
			NavigationHelper.pop(1);
	}, [result]);

	const { frameProcessor } = useScanBarcodes({
		callback: (value) => {
			setLoading(true);

			validateClient({
				deliveryId: route.params?.deliveryId,
				clientId: value
			});
		}
	});

	const renderLoading = useMemo(() => {
		if (loading) {
			return <ActivityIndicator
				size="large"
				color={ Colors.white.pure }
				style={ styles.loadingStyle }
			/>;
		}
		return null;
	}, [loading]);

	return (
		<View style={ styles.container }>
			<TouchableOpacity style={ styles.row } onPress={ () => NavigationHelper.pop(1) }
			>
				<View style={ { flex: 1 } } />
				<Text weight='700' size={ 16 } lineHeight={ 18 } align='center' style={ { flex: 5 } }>Validasi Client ID</Text>
				<Images.IconClose style={ { flex: 1 } } />
			</TouchableOpacity>
			<Text weight='700' size={ 20 } lineHeight={ 27 } align='center' mt={ 20 } color={ Colors.company.red } style={ { paddingHorizontal: 20 } }>Scan Barcode di Keranjang
				untuk Validasi Client ID</Text>

			<View style={ styles.cameraContainer }>
				<Camera
					frameProcessor={ frameProcessor }
					style={ styles.camera }
					isActive={ cameraActive }
				/>

				{ renderLoading }
			</View>

			<Text weight='400' size={ 14 } lineHeight={ 20 } align='center' mt={ 30 } style={ { paddingHorizontal: 20 } }>*Pastikan barcode berada di dalam area kotak
				yang sudah tersedia</Text>

		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		borderBottomColor: Colors.gray.line,
		borderBottomWidth: 1
	},
	cameraContainer: {
		paddingHorizontal: -20,
		marginTop: 20,
		width: '100%',
		height: 300
	},
	camera: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	loadingStyle: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0, left: 0, right: 0, bottom: 0
	},
});

export default ScanBarcode;