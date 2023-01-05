import React, { useMemo } from "react";
import { TextStyle, View, StyleSheet, TouchableOpacity } from "react-native";

import { Colors, Fonts, Images } from "@constant";
import { NavigationHelper } from '@helpers';
import { DeliveryInterface } from "@interfaces";
import { Text } from "@components";

const DeliveryHistoryItem: React.FC<DeliveryInterface.IDeliveryHistory> = props => {

	const {
		id,
		date,
		totalItem,
		totalAccepted,
		totalReturned,
		status,
		customers,
		deliveryNumber
	} = props;

	const renderStatus = useMemo(() => {
		let color = Colors.green.default;

		const iconProps = {
			width: 14,
			height: 14,
			style: styles.statusIcon
		};

		let image = <Images.IconCheckGreen { ...iconProps } />;

		if (status == 'gagal') {
			color = Colors.gray.default;
			image = <Images.IconAlert { ...iconProps } />;
		}

		return (
			<View style={ styles.row }>
				<Text
					color={ color }
					format={ Fonts.paragraph.m.bold as TextStyle }
					style={ { textTransform: 'capitalize' } }
				>
					{ status }
				</Text>

				{ image }
			</View>
		);
	}, [status]);

	const renderLocation = useMemo(() => {
		const numFailed = customers?.filter((value) => !value.success).length ?? 0;

		if (numFailed) {
			return (
				<View style={ { flex: 1 } }>
					<Text
						format={ Fonts.paragraph.m.bold as TextStyle }
						color={ Colors.company.red }
					>
						{ numFailed } Lokasi Gagal,
						<Text
							format={ Fonts.paragraph.m.bold as TextStyle }
						>
							{ ' ' + ((customers?.length ?? 0) - numFailed) } Lokasi Berhasil
						</Text>
					</Text>

					<View style={ styles.rowInfo }>
						<Images.IconAlert width={ 14 } height={ 14 } />
						<Text
							color={ Colors.gray.default }
							format={ Fonts.paragraph.s.bold as TextStyle }
							style={ { marginStart: 8 } }
						>
							Mobil mengalami kerusakan.
						</Text>
					</View>
				</View>
			);
		} else {
			return (
				<Text
					format={ Fonts.paragraph.m.regular as TextStyle }
					color={ Colors.black.default }
				>
					{ customers?.length } Lokasi
				</Text>
			);
		}
	}, [customers]);

	return (
		<TouchableOpacity
			style={ styles.container }
			activeOpacity={ .75 }
			onPress={ () => NavigationHelper.push('DeliveryRouteHistory', { deliveryId: id }) }
		>
			<View style={ styles.row }>
				<Text
					format={ Fonts.paragraph.xl.bold as TextStyle }
					color={ Colors.black.default }
					style={ { flex: 1 } }
				>
					{ deliveryNumber }
				</Text>

				{ renderStatus }

				<Images.More />
			</View>

			<View style={ styles.line } />

			<View style={ styles.rowContent } >
				<Images.IconLocation
					width={ 16 }
					height={ 16 }
					style={ { marginEnd: 12 } } />

				{ renderLocation }
			</View>

			<View style={ styles.rowContent } >
				<Images.IconTime
					width={ 16 }
					height={ 16 }
					style={ { marginEnd: 12 } } />

				<Text
					format={ Fonts.paragraph.m.regular as TextStyle }
					color={ Colors.black.default }
				>
					{ date }
				</Text>
			</View>

			<View style={ [styles.row, { marginTop: 24 }] }>
				<View style={ styles.itemSection }>
					<Text
						format={ Fonts.paragraph.s.regular as TextStyle }
						color={ Colors.gray.default }
					>
						Total Orderan
					</Text>

					<Text
						format={ Fonts.paragraph.m.bold as TextStyle }
						color={ Colors.black.default }
					>
						{ totalItem } Barang
					</Text>
				</View>

				<View style={ [styles.itemSection, { flex: 2 }] }>
					<Text
						format={ Fonts.paragraph.s.regular as TextStyle }
						color={ Colors.gray.default }
					>
						Diterima
					</Text>

					<Text
						format={ Fonts.paragraph.m.bold as TextStyle }
						color={ Colors.green.default }
					>
						{ totalAccepted } Barang
					</Text>
				</View>

				<View style={ styles.itemSection }>
					<Text
						format={ Fonts.paragraph.s.regular as TextStyle }
						color={ Colors.gray.default }
					>
						Keluhan
					</Text>

					<Text
						format={ Fonts.paragraph.m.bold as TextStyle }
						color={ Colors.company.red }
					>
						{ totalReturned } Barang
					</Text>
				</View>
			</View>

		</TouchableOpacity>
	);
};

export default React.memo(DeliveryHistoryItem);

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	rowContent: {
		flexDirection: 'row',
		marginTop: 16,
	},

	rowInfo: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		marginTop: 4,
		paddingHorizontal: 10,
		paddingVertical: 8,
		backgroundColor: Colors.gray.light,
		borderRadius: 8,
	},

	container: {
		flex: -1,
		padding: 20,
		margin: 2,
		backgroundColor: Colors.white.pure,
		borderRadius: 10,
		shadowColor: Colors.gray.default,
		shadowOpacity: 0.04,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		elevation: 5,
	},

	statusIcon: {
		marginStart: 6,
		marginEnd: 16,
	},

	line: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.gray.line,
		marginTop: 16,
	},

	itemSection: {
		flex: 1,
		alignItems: 'center',
	},
});
