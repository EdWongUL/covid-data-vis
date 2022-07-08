import Head from 'next/head';
import { Image } from 'types/page';

export type PageMetaProps = {
	siteName: string;
	metaTitle: string;
	metaDescription?: string;
	metaImage: Image;
	canonical?: string;
	noIndex?: boolean;
};

const PageMeta: React.FC<PageMetaProps> = ({
	siteName,
	metaTitle,
	metaDescription,
	metaImage,
	canonical,
	noIndex,
}) => {
	const title = metaTitle.trim();
	const description = metaDescription && metaDescription.trim();
	const ogImage = metaImage.formats?.medium?.url || metaImage.url || ''; // TODO fallback image

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />

			{canonical && <link rel="canonical" href={canonical} />}

			{noIndex && <meta name="robots" content="noindex" />}

			{/* Facebook */}
			<meta property="og:site_name" content={siteName} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta property="og:description" content={description} />
			<meta property="og:image" name="image" content={ogImage} />

			{/* Twitter */}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={ogImage} />

			{/* Schema */}
			<meta itemProp="name" content={siteName} />
			<meta itemProp="headline" content={title} />
			<meta itemProp="description" content={description} />
			<meta itemProp="author" content="admin" />
		</Head>
	);
};

export default PageMeta;
