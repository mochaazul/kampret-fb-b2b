import React, { ReactNode, useMemo } from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";

import { Button, Text } from "@components";
import { Images, Colors, Fonts } from "@constant";
import { DeliveryInterface } from "@interfaces";

export interface CheckItemProp {
	id: string;
	name: string;
	isComplain?: boolean;
	complainAmount?: string;
	complainLabel?: string;
	complainDesc?: string;
	complainFiles?: Array<ReactNode>;
	onClickComplain?: (payload: DeliveryInterface.IComplainDialogProps) => void;
	onClickConfirm?: (payload: DeliveryInterface.IComplainDialogProps) => void;
	deliveryId?: string,
	clientId?: string;
	existingComplain?: DeliveryInterface.IExistingComplain;
	itemIndex: number;
	isConfirm?: boolean;
	onCheckConfirm?: () => void;
};

const CheckItem: React.FC<CheckItemProp> = item => {

	const renderAction = useMemo(() => {
		const btnProp = { width: 32, height: 32 };
		return (
			<View style={ [styles.buttonContainer, { flex: 2, flexDirection: 'row' }] }>
				<TouchableOpacity onPress={ () => handleClickComplain() }>
					{
						item.isComplain ?
							<Images.IconWarnRed { ...btnProp } /> :
							<Images.IconWarn { ...btnProp } />
					}
				</TouchableOpacity>

				<TouchableOpacity onPress={ item.onCheckConfirm } style={ { marginStart: 16 } }>
					{
						item.isConfirm ?
							<Images.ButtonCheck2 { ...btnProp } /> :
							<Images.ButtonCheck { ...btnProp } />
					}
				</TouchableOpacity>

			</View>
		);
	}, [item.isComplain, item.isConfirm]);

	const renderComplainBtn = useMemo(() => {

		if (!item.isComplain) {
			return (
				<View style={ styles.buttonContainer }>
					<Button
						weight='700'
						backgroundColor='transparent'
						type='outline'
						color={ Colors.company.red }
						text='Buat Keluhan'
						onPress={ () => handleClickComplain() }
					/></View>
			);
		} else {
			return (
				<View style={ styles.buttonContainer }>
					<Button
						weight='700'
						backgroundColor='transparent'
						color={ Colors.gray.default }
						text='Ubah Keluhan'
						onPress={ () => handleClickComplain() }
					/></View>);
		}

	}, [item]);

	const handleClickComplain = () => {
		if (item.onClickComplain) {
			item.onClickComplain(
				{
					deliveryRouteItemId: item.id,
					deliveryId: item.deliveryId,
					clientId: item.clientId,
					itemName: item.name,
					existing: item.existingComplain
				}
			);
		}
	};

	const handleOnClickConfirm = () => {
		if (item.onClickConfirm) {
			item.onClickConfirm(
				{
					deliveryRouteItemId: item.id,
					deliveryId: item.deliveryId,
					clientId: item.clientId,
					itemName: item.name
				}
			);
		}
	};
	return (
		<View style={ styles.container } key={ item.id + '_' + item.itemIndex }>

			<View style={ styles.header }>
				<TouchableOpacity style={ { flex: 5, marginRight: 10 } }
					onPress={ () => handleOnClickConfirm() }
				>
					<Text
						format={ Fonts.textBody.l.bold as TextStyle }
						color={ Colors.black.default }
						ellipsizeMode='middle'
						numberOfLines={ 2 }
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
				</TouchableOpacity>

				{/* { renderComplainBtn } */ }

				{ renderAction }

			</View>

		</View>
	);
};

export default React.memo(CheckItem,
	(prev, next) =>
		JSON.stringify(prev.existingComplain) == JSON.stringify(next.existingComplain) &&
		prev.isConfirm == next.isConfirm
);

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
	},
	buttonContainer: {
		flex: 3,
		alignSelf: 'center',
		marginLeft: 5,
	}
});