import Image from 'next/image';
import { BlogPost } from 'types/page';
import styles from './BlogCard.module.scss';
import Link from 'next/link';

const BlogCard: React.FC<BlogPost> = ({ title, heroImage, excerpt, blogCategories, slug }) => (
	<Link href={`/blog/${slug}`}>
		<a>
			<div className={styles.blogContainer}>
				<div className={styles.imgContainer}>
					{heroImage && (
						<Image src={heroImage.url} layout="fill" className={styles.img} />
					)}
				</div>
				<div className={styles.catContainer}>
					{blogCategories &&
						blogCategories.map((cat) => (
							<p key={`${cat.title}_${cat.id}`}>{cat.title}</p>
						))}
				</div>
				<h2 className={styles.blogTitle}>BlogCard - {title}</h2>
				<div className={styles.excerpt}>{excerpt}</div>
			</div>
		</a>
	</Link>
);

export default BlogCard;
