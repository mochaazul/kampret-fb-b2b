import React, { ReactNode, useMemo, useState } from "react";
import { FlatList, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";

import { Text } from "@components";
import { Colors, Fonts } from "@constant";
import { number } from "yup";

export interface CheckItemProp {
	id: string;
	name: string;
	isComplain: boolean;
	complainAmount?: string;
	complainLabel?: string;
	complainDesc?: string;
	complainFiles?: Array<ReactNode>;
	onClickComplain?: () => void;
};

const CheckItem: React.FC<CheckItemProp> = item => {

	const renderComplainBtn = useMemo(() => {
		const prop = {
			label: 'Hapus Keluhan',
			color: Colors.gray.default
		};

		if (!item.isComplain) {
			prop.label = 'Keluhan';
			prop.color = Colors.company.red;
		}

		return (
			<TouchableOpacity
				activeOpacity={ .75 }
				onPress={ item.isComplain ? undefined : item.onClickComplain }
			>
				<Text
					format={ Fonts.paragraph.m.bold as TextStyle }
					color={ prop.color }
				>
					{ prop.label }
				</Text>
			</TouchableOpacity>
		);
	}, [item.isComplain]);

	const renderComplain = useMemo(() => {
		if (item.isComplain)
			return (
				<>
					<View style={ styles.line } />

					<View style={ styles.header }>
						<Text format={ Fonts.paragraph.m.bold as TextStyle } color={ Colors.black.default }>
							<Text format={ Fonts.paragraph.m.bold as TextStyle } color={ Colors.company.red }>
								{ item.complainAmount + ' ' }
							</Text>
							{ item.complainLabel }
						</Text>
					</View>

					<Text
						format={ Fonts.paragraph.m.regular as TextStyle }
						color={ Colors.black.default }
						mt={ 10 }
					>
						{ item.complainDesc }
					</Text>

					<FlatList
						bounces={ false }
						horizontal={ true }
						keyExtractor={ (item: any, index: number) => 'item_' + index }
						data={ item.complainFiles }
						renderItem={ ({ item }) => <>{ item }</> }
						ItemSeparatorComponent={ () => <View style={ { width: 10 } } /> }
						style={ styles.list }
					/>
				</>
			);
	}, [item.isComplain]);

	return (
		<View style={ styles.container }>

			<View style={ styles.header }>
				<View>
					<Text
						format={ Fonts.paragraph.xl.bold as TextStyle }
						color={ Colors.black.default }
					>
						{ item.name }
					</Text>

					<Text
						format={ Fonts.paragraph.m.regular as TextStyle }
						color={ Colors.gray.default }
						mt={ 4 }
					>
						{ item.id }
					</Text>
				</View>

				{ renderComplainBtn }

			</View>
			{ renderComplain }
		</View>
	);
};

export default React.memo(CheckItem);

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: Colors.white.pure,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	line: {
		height: 1,
		backgroundColor: Colors.gray.line,
		marginVertical: 10,
	},

	list: {
		marginTop: 10,
	}
});