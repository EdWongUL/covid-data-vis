import styles from './TextModule.module.scss';
import CTA, { CTAProps } from '../CTA/CTA';
import classNames from 'classnames';

export type TextProps = {
	header: string;
	body: string;
	align: string;
	CTAs: CTAProps[];
};

const TextModule: React.ComponentType<TextProps> = ({ header, body, align, CTAs }) => {
	const totalCTAs = CTAs !== undefined && CTAs.length;

	return (
		<div className={classNames(styles.container, styles[align])}>
			<h2 className={styles.header}>{header}</h2>
			<p className={styles.body}>{body}</p>
			{totalCTAs > 0 && (
				<div className={styles.outerCTAContainer}>
					<div className={classNames(styles.CTAcontainer, styles[align])}>
						{CTAs.map((cta, idx) => (
							<CTA key={idx} {...cta} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};
export default TextModule;
