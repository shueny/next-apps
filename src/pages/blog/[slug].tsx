import { notFound } from 'next/navigation';
import Layout from '../../components/layout';
import { getMarkdownContent, getBlogPosts } from '../../utils/markdownUtils';
import { Box, Heading } from '@radix-ui/themes';
import './styles.css';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export async function getStaticPaths() {
  const posts = getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const {content, data} = await getMarkdownContent(params.slug);
  return { props: { content, data } };
}

export default function BlogPost({ content, data, markdownContent }: { content: string, data: any, markdownContent: any }) {
  return (
    <Layout>
        <Box className='container'>
            <Heading as='h1' my='4'>{data.title}</Heading>

            <article className='article'>
                <ReactMarkdown className={'description'}>{content}</ReactMarkdown>
                {/* <Box as="div" dangerouslySetInnerHTML={{ __html: content }} /> */}
            </article>
        </Box>
    </Layout>
  );
} 