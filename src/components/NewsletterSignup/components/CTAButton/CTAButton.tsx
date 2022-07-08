import classNames from 'classnames';

import styles from './CTAButton.module.scss';

interface CTAButtonProps {
	text: string;
	disabled?: boolean;
	className?: string;
	type: 'button' | 'submit' | 'reset' | undefined;
}

const CTAButton: React.FC<CTAButtonProps> = ({ className, text, disabled, type }) => (
	<button className={classNames(styles.ctaButton, className)} type={type} disabled={disabled}>
		{text}
	</button>
);

export default CTAButton;
