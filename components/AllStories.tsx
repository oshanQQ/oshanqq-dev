import PostPreview from "./PostPreview";
import Post from "../types/post";
import Header from "../components/Header";

type Props = {
  posts: Post[];
};

const AllStories = ({ posts }: Props) => {
  return (
    <section>
      <Header />
      <div className="grid grid-cols-1 md:gap-x-4 lg:gap-x-12 gap-y-2 px-6 md:px-10 lg:px-64 mb-10">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
};

export default AllStories;
