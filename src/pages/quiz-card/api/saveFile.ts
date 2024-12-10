import type {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const {content} = req.body;

		exec(
			`node saveFile.js "${content}"`,
			(error: Error | null, stdout: string, stderr: string) => {
				if (error) {
					console.error(`Error executing script: ${error.message}`);
					return res.status(500).json({error: error.message});
				}
				if (stderr) {
					console.error(`Script error: ${stderr}`);
					return res.status(500).json({error: stderr});
				}
				console.log(stdout); // Display success message
				return res
					.status(200)
					.json({message: 'File saved successfully'});
			}
		);
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
