import styles from './CardModule.module.scss';
import { Image as TImage } from '../../types/page';
import React from 'react';
import Image from 'next/image';

export type CardProps = {
	image: TImage;
	tag: string;
	header: string;
	subheader: string;
};

const CardModule: React.FC<CardProps> = (props) => {
	const { image, tag, header, subheader } = props;

	return (
		<div className={styles.cardContainer}>
			<div className={styles.imageWrapper}>
				<Image src={image.url} layout="fill" objectFit="cover" />
			</div>
			<div className={styles.tag}>{tag}</div>
			<div className={styles.header}>{header}</div>
			<div className={styles.subheader}>{subheader}</div>
		</div>
	);
};
export default CardModule;
