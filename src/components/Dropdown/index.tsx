import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Animated,
	TextInput,
	ViewStyle
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '@constant';
import { useEffect, useRef, useState } from 'react';

export interface SelectListProps {
	setSelected: (value: string | undefined) => void,
	placeholder?: string,
	boxStyles?: ViewStyle,
	inputStyles?: ViewStyle,
	dropdownStyles?: ViewStyle,
	dropdownItemStyles?: ViewStyle,
	dropdownTextStyles?: ViewStyle,
	maxHeight?: number,
	data: Array<{}>,
	defaultOption: { key: any, value: any; },
	searchicon?: JSX.Element,
	arrowicon?: JSX.Element,
	search?: boolean,
	searchPlaceholder?: string,
	onSelect?: () => void,
	fontFamily?: string,
	notFoundText?: string,
	disabledItemStyles?: ViewStyle,
	disabledTextStyles?: ViewStyle,
	save?: 'key' | 'value',
	dropdownShown?: boolean,
	closeicon?: JSX.Element,
}
type L1Keys = { key?: any; value?: any; disabled?: boolean | undefined; };

const SelectList: React.FC<SelectListProps> = ({
	setSelected,
	placeholder,
	boxStyles,
	inputStyles,
	dropdownStyles,
	dropdownItemStyles,
	dropdownTextStyles,
	maxHeight,
	data,
	defaultOption,
	searchicon = false,
	arrowicon = false,
	closeicon = false,
	search = true,
	searchPlaceholder = "search",
	notFoundText = "No data found",
	disabledItemStyles,
	disabledTextStyles,
	onSelect = () => { },
	save = 'key',
	dropdownShown = false,
	fontFamily
}) => {

	const oldOption = useRef(null);
	const [_firstRender, _setFirstRender] = useState<boolean>(true);
	const [dropdown, setDropdown] = useState<boolean>(dropdownShown);
	const [selectedval, setSelectedVal] = useState<any>("");
	const [height, setHeight] = useState<number>(200);
	const animatedvalue = useRef(new Animated.Value(0)).current;
	const [filtereddata, setFilteredData] = useState(data);


	const slidedown = () => {
		setDropdown(true);
		Animated.timing(animatedvalue, {
			toValue: height,
			duration: 500,
			useNativeDriver: false,

		}).start();
	};
	const slideup = () => {

		Animated.timing(animatedvalue, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false,

		}).start(() => setDropdown(false));
	};

	useEffect(() => {
		if (maxHeight)
			setHeight(maxHeight);
	}, [maxHeight]);


	useEffect(() => {
		setFilteredData(data);
	}, [data]);


	useEffect(() => {
		if (_firstRender) {
			_setFirstRender(false);
			return;
		}
		onSelect();
	}, [selectedval]);


	useEffect(() => {
		if (!_firstRender && defaultOption && oldOption.current != defaultOption.key) {
			// oldOption.current != null
			oldOption.current = defaultOption.key;
			setSelected(defaultOption.key);
			setSelectedVal(defaultOption.value);
		}
		if (defaultOption && _firstRender && defaultOption.key != undefined) {

			oldOption.current = defaultOption.key;
			setSelected(defaultOption.key);
			setSelectedVal(defaultOption.value);
		}

	}, [defaultOption]);

	useEffect(() => {
		if (!_firstRender) {
			if (dropdownShown)
				slidedown();
			else
				slideup();

		}

	}, [dropdownShown]);



	return (
		<View>
			{
				(dropdown && search)
					?
					<View style={ [styles.wrapper, boxStyles] }>
						<View style={ { flexDirection: 'row', alignItems: 'center', flex: 1 } }>
							{
								(!searchicon)
									?
									<Ionicons
										name='md-search'
										color={ Colors.black.default }
										size={ 20 }
										style={ { width: 20, height: 20, marginRight: 7 } }
									/>
									:
									searchicon
							}

							<TextInput
								placeholder={ searchPlaceholder }
								onChangeText={ (val) => {
									let result = data.filter((item: L1Keys) => {
										val.toLowerCase();
										let row = item.value.toLowerCase();
										return row.search(val.toLowerCase()) > -1;
									});
									setFilteredData(result);
								} }
								style={ [{ padding: 0, height: 20, flex: 1, fontFamily }, inputStyles] }
							/>
							<TouchableOpacity onPress={ () => slideup() } >

								{
									(!closeicon)
										?
										<Ionicons
											name='md-chevron-up'
											color={ Colors.black.default }
											size={ 20 }
											style={ { width: 17, height: 17 } }
										/>
										:
										closeicon
								}

							</TouchableOpacity>


						</View>

					</View>
					:
					<TouchableOpacity style={ [styles.wrapper, boxStyles] } onPress={ () => { if (!dropdown) { slidedown(); } else { slideup(); } } }>
						<Text style={ [{ fontFamily }, inputStyles] }>{ (selectedval == "") ? (placeholder) ? placeholder : 'Select option' : selectedval }</Text>
						{
							(!arrowicon)
								?
								<Ionicons
									name='md-chevron-down-outline'
									color={ Colors.black.default }
									size={ 20 }
									style={ { width: 20, height: 20 } }
								/>
								:
								arrowicon
						}

					</TouchableOpacity>
			}

			{
				(dropdown)
					?
					<Animated.View style={ [{ maxHeight: animatedvalue }, styles.dropdown, dropdownStyles] }>
						<ScrollView contentContainerStyle={ { paddingVertical: 10, overflow: 'hidden' } } nestedScrollEnabled={ true }>

							{
								(filtereddata.length >= 1)
									?
									filtereddata.map((item: L1Keys, index: number) => {
										let key = item.key ?? item.value ?? item;
										let value = item.value ?? item;
										let disabled = item.disabled ?? false;
										if (disabled) {
											return (
												<TouchableOpacity style={ [styles.disabledoption, disabledItemStyles] } key={ index } onPress={ () => { } }>
													<Text style={ [{ color: '#c4c5c6', fontFamily }, disabledTextStyles] }>{ value }</Text>
												</TouchableOpacity>
											);
										} else {
											return (
												<TouchableOpacity style={ [styles.option, dropdownItemStyles] } key={ index } onPress={ () => {
													if (save === 'value') {
														setSelected(value);
													} else {
														setSelected(key);
													}

													setSelectedVal(value);
													slideup();
													setTimeout(() => { setFilteredData(data); }, 800);

												} }>
													<Text style={ [{ fontFamily }, dropdownTextStyles] }>{ value }</Text>
												</TouchableOpacity>
											);
										}

									})
									:
									<TouchableOpacity style={ [styles.option, dropdownItemStyles] } onPress={ () => {
										setSelected(undefined);
										setSelectedVal("");
										slideup();
										setTimeout(() => setFilteredData(data), 800);

									} }>
										<Text style={ [{ fontFamily }, dropdownTextStyles] }>{ notFoundText }</Text>
									</TouchableOpacity>
							}



						</ScrollView>
					</Animated.View>
					:
					null
			}


		</View>
	);
};


export default SelectList;


const styles = StyleSheet.create({
	wrapper: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between' },
	dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginTop: 10, overflow: 'hidden' },
	option: { paddingHorizontal: 20, paddingVertical: 8, overflow: 'hidden' },
	disabledoption: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'whitesmoke', opacity: 0.9 }

});