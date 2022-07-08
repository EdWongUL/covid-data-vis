import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { fetchAPI } from 'lib/api';
import { SlugPage, BlogPost } from 'types/page';
import getConfig from 'next/config';

const params = (slug: string) => ({
	filters: {
		category: {
			slug: {
				$eq: slug,
			},
		},
	},
	populate: ['*'],
});

const {
	publicRuntimeConfig: { BASE_URL },
} = getConfig();

const getBlogs = async () => {
	const blogs = await fetchAPI('/blogs', params('blog'));
	if (!blogs.data || !Array.isArray(blogs.data)) throw new Error('Invalid response from CMS');
	return blogs.data.map((post: BlogPost) => ({
		loc: `${BASE_URL}/blog/${post.slug}`,
		lastmod: new Date().toISOString(),
	}));
};

const getPages = async () => {
	const pages = await fetchAPI('/pages');
	if (!pages.data || !Array.isArray(pages.data)) throw new Error('Invalid response from CMS');
	return pages.data.map((page: SlugPage) => ({
		loc: `${BASE_URL}/${page.attributes.slug}`,
		lastmod: new Date().toISOString(),
	}));
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const blogs = await getBlogs();
	const pages = await getPages();

	const fields = [...blogs, ...pages];

	return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}
