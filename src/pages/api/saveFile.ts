import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

// Middleware to handle CORS
const corsHandler = cors({
  methods: ['POST', 'OPTIONS'],
  origin: '*', // Be more specific in production
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS preflight requests
  await new Promise((resolve, reject) => {
    corsHandler(req, res, (err) => {
      if (err) return reject(err);
      resolve(null);
    });
  });

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { content } = req.body;

    // Ensure this code runs only in a Node.js environment
    if (typeof window === 'undefined') {
      const dirPath = path.join(process.cwd(), 'src', 'pages', 'quiz-card'); // Specify the directory path
      const filePath = path.join(dirPath, 'answers.md'); // Specify the file path

      // Check if the directory exists, if not, create it
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true }); // Create the directory if it doesn't exist
      }

      try {
        // Read existing content
        const existingContent = fs.existsSync(filePath)
          ? fs.readFileSync(filePath, 'utf8')
          : '';

        // Append new content
        const newContent = existingContent
          ? `${existingContent}\n\n---\n\n${content}`
          : content;

        // Write file
        fs.writeFileSync(filePath, newContent);

        console.log('文件成功保存');
        return res.status(200).json({ message: '文件成功保存' });
      } catch (error: unknown) {
        console.error(
          `保存文件时出错: ${error instanceof Error ? error.message : String(error)}`
        );
        return res.status(500).json({
          error: error instanceof Error ? error.message : String(error),
        });
      }
    } else {
      return res.status(500).json({ error: '需要伺服器端執行' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`不允許的方法 ${req.method}`);
  }
}

// Disable body parsing
export const config = {
  api: {
    bodyParser: true,
  },
};
