import classnames from 'classnames';
// import { formatDateString } from 'lib/dateFormat';
// import Image from 'next/image';
import { Image as TImage } from 'types/page';
import styles from './SingleBlog.module.scss';

interface BlogHeaderProps {
	title: string;
	image?: TImage;
	date: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title }) => (
	<div className={styles.blogHeader}>
		<div className={classnames(styles.narrowContent, styles.blogTitle)}>
			{/* <h2>{formatDateString(date, 'D MMMM YYYY')}</h2> */}
			<h1 className={styles.title}>{title}</h1>
		</div>
		{/* {image ? (
			<div className={styles.heroImage}>
				<Image src={image.url} layout="fill" objectFit="cover" />
			</div>
		) : (
			<hr className={styles.hr} />
		)} */}
	</div>
);

export default BlogHeader;
