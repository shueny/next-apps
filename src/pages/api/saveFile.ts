import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content } = req.body;

    // Ensure this code runs only in a Node.js environment
    if (typeof window === 'undefined') {
      const dirPath = path.join(process.cwd(), './quiz-card'); // Specify the directory path
      const filePath = path.join(dirPath, 'answers.md'); // Specify the file path

      // Check if the directory exists, if not, create it
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true }); // Create the directory if it doesn't exist
      }

      fs.readFile(filePath, 'utf8', (readError, existingContent) => {
        if (readError) {
          console.error(`读取文件时出错: ${readError.message}`);
          return res.status(500).json({ error: readError.message });
        }

        // Check if the file is not empty
        const newContent = existingContent
          ? `${existingContent}\n---\n${content}\n---\n`
          : content;

        fs.writeFile(filePath, newContent, (error) => {
          // Save content to file
          if (error) {
            console.error(`保存文件时出错: ${error.message}`);
            return res.status(500).json({ error: error.message });
          }
          console.log('文件成功保存'); // Display success message
          return res.status(200).json({ message: '文件成功保存' });
        });
      });
    } else {
      return res.status(500).json({ error: '需要伺服器端執行' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`不允許的方法 ${req.method}`);
  }
}
