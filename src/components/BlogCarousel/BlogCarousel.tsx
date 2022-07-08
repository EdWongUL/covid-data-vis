import styles from './BlogCarousel.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, EffectFade } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { BlogPost, BlogCategory } from 'types/page';
import BlogCard from 'components/BlogCard';

interface BlogCarouselProps {
	title?: string;
	blogPosts: BlogPost[];
	blogCategory: BlogCategory[];
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ title, blogPosts }) => (
	<div className={styles.container}>
		<h2 className={styles.title}>{title}</h2>
		<Swiper
			modules={[Navigation, EffectFade]}
			navigation
			speed={800}
			slidesPerView={1.5}
			spaceBetween={30}
			breakpoints={{
				1024: {
					width: 1024,
					slidesPerView: 2.5,
				},
			}}
			className={styles.postCarousel}
		>
			{blogPosts &&
				blogPosts.map((post) => (
					<SwiperSlide key={`${post.title}_${post.id}`}>
						<BlogCard {...post} />
					</SwiperSlide>
				))}
		</Swiper>
	</div>
);

export default BlogCarousel;
