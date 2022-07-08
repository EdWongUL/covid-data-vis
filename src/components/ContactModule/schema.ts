import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	name: Yup.string().required('First Name is required'),
	email: Yup.string().required('Email is required').email('Email is invalid'),
	textField: Yup.string().required('pizza is not a colour'),
	textArea: Yup.string().required('no msg included'),
});
