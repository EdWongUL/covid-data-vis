import { fetchAPI, fetchBySlug } from 'lib/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Menu } from 'types/navigation';
import BasePage from 'components/BasePage';
import SingleBlog from 'components/SingleBlog';
import { BlogPost } from 'types/page';

type Props = {
	slug: string;
	menu: Menu[];
	footerMenu: Menu[];
	attributes: BlogPost;
};

const Blog: React.ComponentType<Props> = ({ menu, footerMenu, attributes }) => (
	<>
		<BasePage topNavMenu={menu} footerMenu={footerMenu}>
			<SingleBlog attributes={attributes} />
		</BasePage>
	</>
);

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context?.params?.slug;
	const blog = await fetchBySlug(slug, 'blogs');

	if (!blog) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			slug: slug,
			attributes: blog,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const params = {
		filters: {
			blogCategories: {
				slug: {
					$eq: 'blog',
				},
			},
		},
		populate: ['*', 'heroImage', 'blogCategories'],
	};
	const blogs = await fetchAPI(`/blogs`, params);
	if (!blogs.data || !Array.isArray(blogs.data)) throw new Error('Invalid response from CMS');
	return {
		paths: blogs.data.map((post: BlogPost) => `/blog/${post.slug}`),
		fallback: 'blocking',
	};
};

export default Blog;
