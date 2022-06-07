import type { NextPage } from 'next';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { client } from '../libs/client';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await client.get({
    endpoint: 'blog',
    queries: {
      fields: ['id', 'private', 'title'],
    },
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};

const Index: NextPage = ({ blog }) => {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/${blog.private ? 'private' : 'public'}/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
