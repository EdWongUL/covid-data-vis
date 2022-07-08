import styles from './CarouselModule.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardModule, { CardProps } from '../CardModule/CardModule';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Autoplay } from 'swiper';
import React from 'react';

type CarouselProps = {
	cardArray: CardProps[];
	header: string;
	autoplayDelay: number;
};

const CarouselModule: React.ComponentType<CarouselProps> = ({
	cardArray,
	header,
	autoplayDelay,
}) => (
	<div className={styles.container}>
		<div className={styles.header}>{header}</div>
		<Swiper
			slidesPerView={'auto'}
			spaceBetween={30}
			loop={true}
			autoplay={
				autoplayDelay !== 0
					? {
							delay: autoplayDelay * 1000,
							disableOnInteraction: false,
					  }
					: false
			}
			speed={600}
			navigation={true}
			modules={[Autoplay, Navigation]}
			className="swiperContainer"
		>
			{cardArray.map((card, idx) => (
				<SwiperSlide key={idx}>
					<CardModule {...card} />
				</SwiperSlide>
			))}
		</Swiper>
	</div>
);
export default CarouselModule;
