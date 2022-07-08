import classnames from 'classnames';
import styles from './InputField.module.scss';
import { Field, ErrorMessage, FormikErrors, FormikTouched } from 'formik';

type InputFieldProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	touched: FormikTouched<{ [field: string]: any }>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: FormikErrors<{ [field: string]: any }>;
	placeholder: string;
	type: string;
};

export const InputField: React.ComponentType<InputFieldProps> = ({
	errors,
	touched,
	type,
	placeholder,
}) => (
	<div className={styles.inputContainer}>
		<Field
			name={type}
			placeholder={placeholder}
			type="text"
			className={classnames(
				styles.formControl,
				errors[type] && touched[type] ? styles.isInvalid : ''
			)}
		/>
		<ErrorMessage name={type} component="div" className={styles.invalidFeedback} />
	</div>
);
