import React, { ReactNode, useMemo } from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View, Image } from "react-native";

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
	qtyOrder: {
		order: number,
		kgFactor: number;
	};
	isConfirm?: boolean;
	onCheckConfirm?: (id: string) => void;
	onUncheckConfirm?: (id: string) => void;
	onClickDelete: (
		deleteItem: {
			deliveryId: string | undefined,
			clientId: string | undefined,
			itemId: string | null;
		}
	) => void;
};

const CheckItem: React.FC<CheckItemProp> = item => {

	const checkHandler = () => {
		if (item.isConfirm && item.onUncheckConfirm)
			item.onUncheckConfirm(item.id);
		else if (!item.isConfirm && item.onCheckConfirm)
			item.onCheckConfirm(item.id);
	};

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

				<TouchableOpacity
					onPress={ () => item.isComplain ? false : checkHandler() }
					style={ { marginStart: 16 } }
				>
					{
						item.isConfirm ?
							<Images.ButtonCheck2 { ...btnProp } /> :
							<Images.ButtonCheck { ...btnProp } />
					}
				</TouchableOpacity>

			</View>
		);
	}, [item.isComplain, item.isConfirm]);

	const handleClickComplain = () => {
		if (item.onClickComplain) {
			item.onClickComplain(
				{
					deliveryRouteItemId: item.id,
					deliveryId: item.deliveryId,
					clientId: item.clientId,
					itemName: item.name,
					existing: item.existingComplain,
					qtyOrder: item.qtyOrder
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
					itemName: item.name,
					qtyOrder: item.qtyOrder
				}
			);
		}
	};

	const complainThumbnail = (existing?: DeliveryInterface.IExistingComplain) => {
		let pureItemId: string | null = null;

		if (existing) {
			if (item && item.id) {
				pureItemId = item.id.split('-')[1];
			}
			return (
				<View style={ styles.upLine }>
					<View style={ styles.thumbnail }>
						<View style={ { flex: 4 } }>
							<View style={ [styles.thumbnail, { marginTop: 10 }] }>
								<Text
									format={ Fonts.textBody.l.bold as TextStyle }
									color={ Colors.alert.red }
									numberOfLines={ 1 }
								>
									{ existing.qty + ' ' }
								</Text>
								<Text
									format={ Fonts.textBody.l.bold as TextStyle }
									color={ Colors.black.default }
									ellipsizeMode='head'
									numberOfLines={ 2 }
								>
									{ existing.category }
								</Text>
							</View>
							<Text
								format={ Fonts.textBody.s.regular as TextStyle }
								color={ Colors.black.default }
								ellipsizeMode='middle'
								numberOfLines={ 3 }
								mt={ 10 }
							>
								{ existing.description }
							</Text>

							{ existing.imageUrl &&
								<View style={ styles.thumbnail }>

									<Image source={ { uri: existing.imageUrl[0] } } resizeMethod='resize' resizeMode='cover' style={ styles.images } />
									{ existing.imageUrl[1] && <Image source={ { uri: existing.imageUrl[1] } } resizeMethod='resize' resizeMode='cover' style={ styles.images } /> }
									{ existing.imageUrl[2] && <Image source={ { uri: existing.imageUrl[2] } } resizeMethod='resize' resizeMode='cover' style={ styles.images } /> }
								</View>
							}

						</View>
						<TouchableOpacity
							style={ styles.deleteButton }
							onPress={ () => item.onClickDelete(
								{
									deliveryId: item.deliveryId,
									clientId: item.clientId,
									itemId: pureItemId
								}
							) }
						>
							<Images.IconTrash />
						</TouchableOpacity>

					</View>
				</View>);
		} else {
			return <View />;
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
						{ item.name + ' : ' + item.qtyOrder.order }
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

			{ complainThumbnail(item.existingComplain) }
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
	},
	upLine: {
		borderTopColor: Colors.gray.line,
		borderTopWidth: 1,
		marginTop: 10,
		marginLeft: 20
	},
	thumbnail: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	images: {
		height: 80,
		width: 80,
		marginTop: 20,
		marginRight: 5,
		borderRadius: 5
	},
	deleteButton: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 80

	}
});