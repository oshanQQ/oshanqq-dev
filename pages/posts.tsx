import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Props = {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
  }[];
};

export default function Posts(props: Props) {
  return (
    <ul>
      {props.posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <p>{post.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const filePath = path.join("posts", fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug: fileName.replace(".md", ""),
      title: data.title,
      excerpt: data.excerpt,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
