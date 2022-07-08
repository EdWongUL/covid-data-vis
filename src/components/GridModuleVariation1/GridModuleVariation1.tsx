import BlogCard from 'components/BlogCard';
import { BlogCategory, BlogPost } from 'types/page';
import styles from './GridModuleVariation1.module.scss';

interface GridModuleVariation1Props {
	title?: string;
	blogPosts: BlogPost[];
	blogCategory: BlogCategory[];
}

const GridModuleVariation1: React.FC<GridModuleVariation1Props> = ({ title, blogPosts }) => (
	<div className={styles.container}>
		{title && <h2>{title}</h2>}
		<div className={styles.gridListing}>
			{blogPosts &&
				blogPosts.map((post) => <BlogCard key={`${post.title}_${post.id}`} {...post} />)}
		</div>
	</div>
);

export default GridModuleVariation1;
