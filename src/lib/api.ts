import getConfig from 'next/config';
import qs from 'qs';
import _ from 'lodash';

const {
	serverRuntimeConfig: { STRAPI_URL },
} = getConfig();

export async function fetchPage(slug: string | string[] | undefined) {
	const path = `/pages/slug/${slug}`;
	return await fetchAPI(path);
}

export async function fetchBySlug(slug: string | string[] | undefined, postType: string) {
	const path = `/${postType}/slug/${slug}`;
	return await fetchAPI(path);
}

export async function fetchMenu(slug = 'navigation') {
	const path = `/menus/${slug}`;
	let data = [];
	try {
		data = await fetchAPI(path);
	} catch (error) {
		console.error(error);
		return data;
	}

	return _.sortBy(data.menu.items, 'order');
}

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}): Promise<any> {
	const mergedOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
		...options,
	};

	const queryString = qs.stringify(urlParamsObject);
	const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

	const response = await fetch(requestUrl, mergedOptions);

	if (!response.ok) {
		if (response.status === 404) return null;
		throw new Error(`An error occured: ${requestUrl} ${response.statusText}`);
	}

	return await response.json();
}
