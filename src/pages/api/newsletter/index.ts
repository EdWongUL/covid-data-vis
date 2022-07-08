import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { email } = req.body;

	if (!email) {
		return res.status(400).send({
			error: 'No email provided',
		});
	}

	return res.json({ ok: true });
}
