import classNames from 'classnames';
import Link from 'next/link';
import styles from './CTA.module.scss';

export type CTAProps = {
	text: string;
	theme: string;
	link?: string;
};

const CTA: React.ComponentType<CTAProps> = ({ text, link, theme }) => (
	<Link className={styles.container} href={`/${link || ''}`}>
		<a>
			<button className={classNames(styles.button, styles[theme])}>{text}</button>
		</a>
	</Link>
);

export default CTA;
