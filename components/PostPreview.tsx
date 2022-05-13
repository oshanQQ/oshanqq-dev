import Link from "next/link";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

const PostPreview = ({ title, date, excerpt, slug }: Props) => {
  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <div className="px-6 py-10 bg-white rounded-xl shadow-sm cursor-pointer">
        <h3 className="text-2xl font-bold mb-4">
          <a>{title}</a>
        </h3>
        <p className="text-md mb-4 leading-relaxed text-[#6C6C6C]">{excerpt}</p>
        <div className="text-lg text-[#6C6C6C]">{date}</div>
      </div>
    </Link>
  );
};

export default PostPreview;
