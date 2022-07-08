import { BlogCategory, BlogPost } from 'types/page';
import BlogCard from 'components/BlogCard';
import styles from './GridModuleVariation2.module.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

interface GridModuleVariation2Props {
	title?: string;
	blogPosts: BlogPost[];
	blogCategory: BlogCategory[];
	columnNumber: string;
	mobileLayout: string;
}

const GridModuleVariation2: React.FC<GridModuleVariation2Props> = ({
	title,
	blogPosts,
	columnNumber,
	mobileLayout,
}) => {
	const [visibleBlogs, setVisibleBlogs] = useState(6);

	const handleClick = () => {
		setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
	};

	return (
		<div className={styles.container}>
			{title && <h2>{title}</h2>}
			<div
				className={classNames(
					styles.gridListing,
					styles[columnNumber],
					styles[mobileLayout],
					'parent-container'
				)}
			>
				{blogPosts &&
					blogPosts
						.slice(0, visibleBlogs)
						.map((post) => <BlogCard key={`${post.title}_${post.id}`} {...post} />)}
			</div>
			<button type="button" className={styles.loadMore} onClick={handleClick}>
				More
			</button>
		</div>
	);
};

export default GridModuleVariation2;
