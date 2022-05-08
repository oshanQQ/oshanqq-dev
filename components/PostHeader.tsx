import PostTitle from "./PostTitle";

type Props = {
  title: string;
  date: string;
};

const PostHeader = ({ title, date }: Props) => {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <PostTitle>{title}</PostTitle>
        <div className="mb-6 text-lg text-[#6C6C6C]">{date}</div>
      </div>
    </>
  );
};

export default PostHeader;
