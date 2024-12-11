import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = path.join(
    process.cwd(),
    'src',
    'pages',
    'quiz-card',
    'answers.md'
  );

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ content: fileContent });
  } catch (error) {
    res.status(500).json({ error: 'Error reading file' });
  }
}
