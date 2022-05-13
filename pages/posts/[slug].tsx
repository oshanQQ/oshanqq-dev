import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/Container";
import PostBody from "../../components/PostBody";
import Header from "../../components/Header";
import PostHeader from "../../components/PostHeader";
import Layout from "../../components/Layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/PostTitle";
import Head from "next/head";
import markdownToHtml from "zenn-markdown-html";
import PostType from "../../types/post";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const Post = ({ post, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title} | oshanqq dev</title>
                <meta property="og:image" />
              </Head>
              <PostHeader
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
