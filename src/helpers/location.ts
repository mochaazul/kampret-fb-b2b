import { Dispatches } from "@constant";
import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";
import { useAppDispatch } from "./hooks";

const setLatitude = useAppDispatch(Dispatches.SET_LATITUDE);
const setLongitude = useAppDispatch(Dispatches.SET_LONGITUDE);
const setStatus = useAppDispatch(Dispatches.STATUS_LOCATION);

export const requestLocationPermission = async () => {
	if (Platform.OS === 'ios') {
		getOneTimeLocation();
		// subscribeLocationLocation();
	} else {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Location Access Required',
					message: 'This App needs to Access your location',
					buttonPositive: ''
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				//To Check, If Permission is granted
				getOneTimeLocation();
				// subscribeLocationLocation();
			} else {
				setStatus('failed');
			}
		} catch (err) {
			console.warn(err);
		}
	}
};

export const getOneTimeLocation = () => {
	setStatus('loading');
	Geolocation.getCurrentPosition(
		//Will give you the current location
		(position) => {
			setStatus('success');

			//Setting Longitude state
			setLatitude(position.coords.longitude);

			//Setting Longitude state
			setLongitude(position.coords.latitude);
		},
		() => {
			setStatus('failed');
		},
		{
			enableHighAccuracy: false,
			timeout: 30000,
			maximumAge: 1000
		},
	);
};