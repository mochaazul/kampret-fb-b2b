import * as yup from 'yup';

export const DeliveryCheckValidationSchema = yup.object().shape({
	receiverName: yup.string().required('Wajib diisi'),
	photoUri: yup.string().required(),
	//returnChecked: yup.boolean().isTrue(),
});

export const InputKMvalidationSchema = yup.object().shape({
	kmSpeedometer: yup.number().required('Wajib diisi').nullable(),
	photoUri: yup.string().required().nullable(),
});