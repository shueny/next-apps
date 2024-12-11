import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const {content} = req.body;

		// Ensure this code runs only in a Node.js environment
		if (typeof window === 'undefined') {
			const filePath = path.join(process.cwd(), './quiz-card/answers.md'); // Specify the file path
			fs.writeFile(filePath, content, (error) => {
				// Save content to file
				if (error) {
					console.error(`保存文件時出錯: ${error.message}`);
					return res.status(500).json({error: error.message});
				}
				console.log('文件成功保存'); // Display success message
				return res.status(200).json({message: '文件成功保存'});
			});
		} else {
			return res.status(500).json({error: '需要伺服器端執行'});
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`不允許的方法 ${req.method}`);
	}
}
