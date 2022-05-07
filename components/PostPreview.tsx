import DateFormatter from "./DateFormatter";
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
      <div className="px-8 py-12 bg-white rounded-md shadow-sm cursor-pointer">
        <h3 className="text-2xl font-bold mb-4">
          <a>{title}</a>
        </h3>
        <div className="text-lg mb-4 text-[#6C6C6C]">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-md leading-relaxed text-[#6C6C6C]">{excerpt}</p>
      </div>
    </Link>
  );
};

export default PostPreview;
