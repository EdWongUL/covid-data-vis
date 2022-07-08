import { fetchAPI } from 'lib/api';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { SlugPage, BlogPost } from 'types/page';

const {
	serverRuntimeConfig: { STRAPI_WEBHOOK_SECRET },
} = getConfig();

export default async function handleWebhook(req: NextApiRequest, res: NextApiResponse) {
	console.debug('handleWebhook');
	console.debug(`attempting to revalidate a: ${req.body.model}`);

	if (!req.headers['x-strapi-event'] || !req.headers['x-strapi-secret']) {
		console.debug(`handleWebhook: 404`);
		return res.status(404).send('Not Found');
	}

	if (req.headers['x-strapi-secret'] !== STRAPI_WEBHOOK_SECRET) {
		console.debug(
			`handleWebhook: 401 ${req.headers['x-strapi-secret']} ${STRAPI_WEBHOOK_SECRET}`
		);
		return res.status(401).send('Not Authenticated');
	}

	if (req.body.model == 'page' && req.body.entry) {
		await res.unstable_revalidate(`/${req.body.entry.slug}`);
		console.debug(`handleWebhook: page revalidate success - ${req.body.entry.name}`);
		return res.status(200).send('Success!');
	}

	if (req.body.model == 'blog' && req.body.entry) {
		const slug = req.body.entry.category.slug ?? 'blog';
		await res.unstable_revalidate(`/${slug}/${req.body.entry.slug}`);
		await res.unstable_revalidate('/');
		console.debug(`handleWebhook: blog revalidate success - ${req.body.entry.title}`);
		return res.status(200).send('Success!');
	}

	await revalidateAll(res);
	await res.unstable_revalidate('/');
	console.debug(`handleWebhook: / revalidate success`);
	return res.status(200).send('Success!');
}

async function revalidateAll(res: NextApiResponse) {
	// Revalidate single page slugs same as below
	await res.unstable_revalidate(`/contact-us`);
	await res.unstable_revalidate(`/terms-and-conditions`);
	await res.unstable_revalidate(`/cookie-policy`);
	await res.unstable_revalidate(`/privacy-policy`);

	// Revalidate collection types
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

	const slugs: Promise<void>[] = [];
	const pages = await fetchAPI('/pages');
	slugs.concat(
		pages.data.map(
			async (page: SlugPage) => await res.unstable_revalidate(`/${page.attributes.slug}`)
		)
	);

	const blogs = await fetchAPI('/blogs', params('blog'));
	slugs.concat(
		blogs.data.map(
			async (blog: BlogPost) => await res.unstable_revalidate(`/blog/${blog.slug}`)
		)
	);

	console.debug('revalidating the following slugs:');
	console.debug(pages.data.map((x: SlugPage) => `/${x.attributes.slug}`));
	console.debug(blogs.data.map((x: BlogPost) => `/${x.slug}`));

	await Promise.all(slugs);
}
