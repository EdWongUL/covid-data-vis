import classNames from 'classnames';
import styles from './TextField.module.scss';

type InputFieldProps = {
	value: string;
	errors: string | undefined;
	type: string;
	placeholder: string;
	disabled?: boolean;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

export const InputField: React.ComponentType<InputFieldProps> = ({
	className,
	errors,
	type,
	placeholder,
	value,
	disabled = false,
	onChange,
	name,
}) => (
	<input
		type={type}
		placeholder={placeholder}
		className={classNames(styles.formControl, errors && styles.isInvalid, className)}
		value={value}
		disabled={disabled}
		onChange={onChange}
		name={name}
	/>
);

export default InputField;
