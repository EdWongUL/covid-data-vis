import PageModules from 'components/PageModules';
import { fetchAPI, fetchBySlug } from 'lib/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Module, SlugPage } from 'types/page';
import { PageMetaProps } from 'components/PageMeta/PageMeta';
import { Menu } from 'types/navigation';
import BasePage from 'components/BasePage';

type Props = {
	slug: string;
	menu: Menu[];
	footerMenu: Menu[];
	attributes: {
		modules: Module[];
		content: string | null;
		meta: PageMetaProps;
		theme: string;
	};
};

const Page: React.ComponentType<Props> = ({ menu, footerMenu, attributes }) => (
	<>
		<BasePage topNavMenu={menu} footerMenu={footerMenu}>
			<PageModules modules={attributes.modules} />
		</BasePage>
	</>
);

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context?.params?.slug;
	console.log(`getStaticProps: fetching ${slug}`);
	const page = await fetchBySlug(slug, 'pages');
	// const menu = await fetchMenu();
	// const footerMenu = await fetchMenu('footer');

	if (!page) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			slug: page.slug,
			attributes: page,
			// menu: menu,
			// footerMenu: footerMenu,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await fetchAPI(`/pages`);
	if (!pages.data || !Array.isArray(pages.data)) throw new Error('Invalid response from CMS');
	return {
		paths: pages.data.map((page: SlugPage) => `/${page.attributes.slug}`),
		fallback: 'blocking',
	};
};

export default Page;
