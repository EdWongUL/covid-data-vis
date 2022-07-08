import styles from './HeroModule.module.scss';
import CTA from '../CTA/CTA';
import { Image as TImage } from '../../types/page';
import classNames from 'classnames';

export type HeroProps = {
	header: string;
	align: string;
	subheader?: string;
	background?: TImage;
	leftButtonText: string;
	leftButtonTheme: string;
	leftButtonLink: string;
	rightButtonText: string;
	rightButtonTheme: string;
	rightButtonLink: string;
};

const HeroModule: React.ComponentType<HeroProps> = ({
	header,
	subheader,
	align,
	background,
	leftButtonText,
	leftButtonTheme,
	leftButtonLink,
	rightButtonText,
	rightButtonTheme,
	rightButtonLink,
}) => {
	const leftButton = leftButtonText !== '' && leftButtonTheme !== null;
	const rightButton = rightButtonText !== '' && rightButtonTheme !== null;
	return (
		<div
			className={classNames(styles.container, styles[align])}
			style={background ? { backgroundImage: `url(${background.url})` } : {}}
		>
			<h2 className={styles.header}>{header}</h2>
			{subheader && <h3 className={styles.subheader}>{subheader}</h3>}
			{leftButton && (
				<div className={styles.outerCTAContainer}>
					<div className={classNames(styles.CTAcontainer, styles[align])}>
						<CTA text={leftButtonText} theme={leftButtonTheme} link={leftButtonLink} />
						{rightButton && (
							<CTA
								text={rightButtonText}
								theme={rightButtonTheme}
								link={rightButtonLink}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default HeroModule;
