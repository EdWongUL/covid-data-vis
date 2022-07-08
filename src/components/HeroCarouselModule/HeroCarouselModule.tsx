import styles from './HeroCarouselModule.module.scss';
import HeroModule, { HeroProps } from '../HeroModule/HeroModule';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper';
import React from 'react';

type HeroCarouselProps = {
	heroArray: HeroProps[];
	autoplayDelay: number;
};

const HeroCarouselModule: React.ComponentType<HeroCarouselProps> = ({
	heroArray,
	autoplayDelay,
}) => (
	<div className={styles.container}>
		<Swiper
			slidesPerView={1}
			spaceBetween={0}
			loop={true}
			pagination={{
				clickable: true,
			}}
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
			modules={[Autoplay, Pagination, Navigation]}
			className="swiperContainer"
		>
			{heroArray.map((hero, idx) => (
				<SwiperSlide key={idx}>
					<HeroModule {...hero} />
				</SwiperSlide>
			))}
		</Swiper>
	</div>
);
export default HeroCarouselModule;
