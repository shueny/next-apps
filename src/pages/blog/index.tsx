import Link from 'next/link';
import { getBlogPosts } from '../../utils/markdownUtils';
import Layout from '../../components/layout';
import { Flex, Box, Card, Text, Heading } from '@radix-ui/themes';

interface BlogPost {
  slug: string;
  description: string;
  
  [key: string]: any;
}

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <Layout>
      <Heading as='h1' my='4'>Blog</Heading>
      <Flex gap="3" mt={'4'}>
        {posts.map((post) => {
            console.log(post)
            return(
                <Box key={post.slug} style={{flex: 3}} >
                        <Card asChild style={{display: 'flex', flexDirection: 'column'}}>
                            <Link href={`/blog/${post.slug}`}>
                                <Heading as='h3'>{post.title}</Heading>
                                <Text as='p'>{post.date}</Text>
                                <Text as='p'>{post.description}</Text>
                            </Link>
                        </Card>
                </Box>
        )})}
      </Flex>
    </Layout>
  );
}

// Fetch blog posts at build time
export async function getStaticProps() {
  const posts = getBlogPosts(); // This will run on the server side
  return {
    props: {
      posts,
    },
  };
} 