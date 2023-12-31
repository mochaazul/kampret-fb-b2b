import * as yup from 'yup';

export const LoginValidationSchema = yup.object().shape({
	username: yup
		.string().required('Username tidak terdaftar')
		.label('Username'),
	password: yup
		.string().required('Kata sandi tidak valid')
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

export const PhoneNumberValidationSchema = yup.object().shape({
	phoneNumber: yup
		.string().required('Username tidak terdaftar').matches(/^(0)8[1-9][0-9]{6,10}$/, 'nomor tidak valid')
		.label('Nomor Telepon'),
});

export const ResetPasswordValidationSchema = yup.object().shape({

	firstPassword: yup
		.string().required('Sandi wajib diisi')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
			'Minimal kata sandi adalah 8 karakter, Satu huruf kapital,\nSatu huruf kecil dan Satu Angka').nullable(),
	secondPassword: yup
		.string().required('Konfirmasi sandi wajib diisi')
		.oneOf([yup.ref('firstPassword'), null], 'Konfirmasi sandi tidak sama dengan sandi').nullable(),
});

export const InputClientID = yup.object().shape({

	clientID: yup
		.string().required('harus diisi').label('clientID').nullable(),
});

export const ComplainValidationSchema = yup.object().shape({
	description: yup.string().required('wajib diisi').nullable(),
	followupSelected: yup.string().notOneOf(['9'], 'wajib pilih salah satu'),
	complainSelected: yup.string().notOneOf(['9'], 'wajib pilih salah satu').nullable(),
	photoTaken: yup.bool().isTrue('wajib lampirkan photo'),
	qty: yup.string().nullable()
});

export const ReportIssueValidation = yup.object().shape({
	description: yup.string().required('wajib diisi').nullable(),
	title: yup.string().required('Title wajib diisi').nullable(),
	image: yup.string().required('Foto wajib diisi').nullable(),
});

export const NotesValidation = yup.object().shape({
	notes: yup.string().nullable()
});