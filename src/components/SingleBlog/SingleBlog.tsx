import Blocks from 'editorjs-blocks-react-renderer';
import { BlogPost } from 'types/page';
import styles from './SingleBlog.module.scss';
import BlogHeader from './BlogHeader';

interface SingleBlogProps {
	attributes: BlogPost;
}

const SingleBlog: React.FC<SingleBlogProps> = ({ attributes }) => (
	<div className={styles.container}>
		<BlogHeader
			date={attributes.publishedAt}
			title={attributes.title}
			image={attributes.heroImage}
		/>
		<div className={styles.blogContent}>
			<Blocks data={JSON.parse(attributes.content)} />
		</div>
	</div>
);

export default SingleBlog;
