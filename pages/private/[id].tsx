import { client } from '../../libs/client';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const id = context?.params?.id as string;
  const session = await getSession(req, res);
  if (!session) {
    return { props: {} };
  }

  const data = await client.get({ endpoint: 'blog', contentId: id });
  return {
    props: {
      blog: data,
      user: session.user,
    },
  };
};

export default function PrivateId({ blog, user }) {
  if (user) {
    return (
      <main>
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>
      </main>
    );
  }
  return <main>ログインが必要です</main>;
}
