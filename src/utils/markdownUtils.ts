import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

export async function getMarkdownContent(slug: string) {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  return { data, content: processedContent.toString() };
}

export function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  const filenames = fs.readdirSync(postsDirectory); // This is safe here

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
    };
  });
}
