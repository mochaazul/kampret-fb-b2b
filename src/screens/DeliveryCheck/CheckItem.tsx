import React from "react";
import { Image, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Images } from "@constant";
import { DeliveryResponseInterface } from "@interfaces";
import { Text } from "@components";

export interface CheckItemProp {
	item: DeliveryResponseInterface.Item;
	confirmed: boolean;
	onConfirm: (item: DeliveryResponseInterface.Item) => void;
	onUnconfirm: (item: DeliveryResponseInterface.Item) => void;
	onComplain: (item: DeliveryResponseInterface.Item) => void;
	onDeleteComplain: (item: DeliveryResponseInterface.Item) => void;
}

const CheckItem2: React.FC<CheckItemProp> = prop => {

	const { item, confirmed, onConfirm, onUnconfirm, onComplain, onDeleteComplain } = prop;

	const checkHandler = () => {
		if (confirmed)
			onUnconfirm(item);
		else if (!confirmed)
			onConfirm(item);
	};

	const renderItemInfo = () => (
		<View style={ styles.info }>
			<Text
				format={ Fonts.textBody.l.bold as TextStyle }
				color={ Colors.black.default }
				ellipsizeMode='middle'
				numberOfLines={ 2 }
			>
				{ item.item_name + ' : ' + item.qty_order }
			</Text>

			<Text
				format={ Fonts.paragraph.m.regular as TextStyle }
				color={ Colors.gray.default }
				mt={ 4 }
			>
				{ `${ item.sales_no }-${ item.delivery_route_item_id }` }
			</Text>
		</View>
	);

	const renderAction = () => {
		const btnProp = { width: 32, height: 32 };
		return (
			<View style={ [styles.buttonContainer, { flex: 2, flexDirection: 'row' }] }>
				<TouchableOpacity onPress={ () => onComplain(item) }>
					{
						item.complaint_description ?
							<Images.IconWarnRed { ...btnProp } /> :
							<Images.IconWarn { ...btnProp } />
					}
				</TouchableOpacity>

				<TouchableOpacity
					onPress={ () =>
						item.complaint_description ? false : checkHandler()
					}
					style={ { marginStart: 16 } }
				>
					{
						confirmed ?
							<Images.ButtonCheck2 { ...btnProp } /> :
							<Images.ButtonCheck { ...btnProp } />
					}
				</TouchableOpacity>

			</View>
		);
	};

	const renderComplain = (key: string) => {
		if (item.complaint_description) {
			return (
				<View style={ styles.upLine }>
					<View style={ styles.thumbnail }>
						<View style={ { flex: 4 } }>
							<View style={ [styles.thumbnail, { marginTop: 10 }] }>
								{ item.complaint_category == 'Kuantitas Tidak Sesuai' &&
									<Text
										format={ Fonts.textBody.l.bold as TextStyle }
										color={ Colors.alert.red }
										numberOfLines={ 1 }
									>
										{ `${ item.qty_reject == 0 ? item.qty_received : item.qty_reject } ` }
									</Text>
								}
								{ item.complaint_category != 'Kuantitas Tidak Sesuai' &&
									<Text
										format={ Fonts.textBody.l.bold as TextStyle }
										color={ Colors.alert.red }
										numberOfLines={ 1 }
									>
										{ `${ item.qty_reject } ` }
									</Text>
								}
								<Text
									format={ Fonts.textBody.l.bold as TextStyle }
									color={ Colors.black.default }
									ellipsizeMode='head'
									numberOfLines={ 2 }
								>
									{ item.complaint_category }
								</Text>
							</View>
							<Text
								format={ Fonts.textBody.s.regular as TextStyle }
								color={ Colors.black.default }
								ellipsizeMode='middle'
								numberOfLines={ 3 }
								mt={ 10 }
							>
								{ item.complaint_description }
							</Text>

							{ item.complaint_images &&
								<View style={ styles.thumbnail }>
									{
										item.complaint_images.map((item, index) => {
											return (
												<Image
													source={ { uri: item } }
													resizeMethod='resize'
													resizeMode='cover'
													style={ styles.images }
													key={ key + index }
												/>
											);
										})
									}

								</View>
							}

						</View>

						<TouchableOpacity
							style={ styles.deleteButton }
							onPress={ () => onDeleteComplain(item) }
						>
							<Images.IconTrash />
						</TouchableOpacity>

					</View>
				</View>);
		}

		return (<View />);
	};

	return (
		<View
			style={ styles.container }
			key={ `${ item.sales_no }-${ item.delivery_route_item_id }` }
		>

			<View style={ styles.header }>
				{ renderItemInfo() }

				{ renderAction() }
			</View>

			{ renderComplain(`${ item.sales_no }-${ item.delivery_route_item_id }`) }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: Colors.white.pure,
	},

	info: {
		flex: 5,
		marginRight: 10
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

export default React.memo(
	CheckItem2,
	(prev, next) => {
		const res = prev.confirmed == next.confirmed &&
			prev.item.complaint_description == next.item.complaint_description;

		return res;
	}
);