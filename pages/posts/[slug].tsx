import { GetStaticPropsContext } from "next";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";

type Props = {
  frontMatter: {
    [key: string]: string;
  };
  content: string;
};

export default function Page(props: Props) {
  const { frontMatter, content } = props;
  const html = marked(content);
  return (
    <div>
      <div>{frontMatter.title}</div>
      <div>{frontMatter.excerpt}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params) {
    return {
      props: {},
    };
  }

  const filePath = `posts/${params.slug}.md`;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    props: {
      frontMatter: data,
      content,
    },
  };
}
