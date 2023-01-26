import { useEffect } from 'react';
import { useScanBarcodes as useScanBarcode, BarcodeFormat } from 'vision-camera-code-scanner';

type UseScanBarcode = {
	callback?: (value: string) => void;
};

const useScanBarcodes = ({ callback }: UseScanBarcode) => {
	const [frameProcessor, barcodes] = useScanBarcode([BarcodeFormat.EAN_13, BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128, BarcodeFormat.CODE_39, BarcodeFormat.EAN_8], {
		checkInverted: true,
	});

	useEffect(() => {
		if (barcodes[0]?.rawValue && callback) {
			callback(barcodes[0]?.rawValue);
		}
	}, [barcodes, callback]);
	return {
		frameProcessor
	};
};

export default useScanBarcodes;