import { client } from '../../libs/client';

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: 'blog',
    queries: {
      filters: 'private[equals]false',
    },
  });

  const paths = data.contents.map((content) => `/public/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export default function PublicId({ blog }) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
    </main>
  );
}
