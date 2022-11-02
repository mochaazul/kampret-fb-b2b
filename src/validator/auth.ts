import * as yup from 'yup';

export const LoginValidationSchema = yup.object().shape({
	phone_number: yup
		.string().required()
		.label('Phone Number'),
	password: yup
		.string().required()
		.label('Password'),
});

export const RegisterValidationSchema = yup.object().shape({
	phone_number: yup
		.string().required()
		.label('Phone Number'),
	password: yup
		.string().required('Sandi wajib diisi')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
			'Minimal kata sandi adalah 8 karakter, Satu huruf kapital,\nSatu huruf kecil,Satu Angka dan Satu Karakter khusus'),
	confirm_password: yup
		.string().required('Konfirmasi sandi wajib diisi')
		.oneOf([yup.ref('password'), null], 'Konfirmasi sandi tidak sama dengan sandi'),
});
