import * as yup from 'yup';

export const DeliveryCheckValidationSchema = yup.object().shape({
	receiverName: yup.string().required('Wajib diisi'),
	photoUri: yup.string().required(),
	returnChecked: yup.boolean().isTrue(),
});