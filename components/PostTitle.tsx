import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-3xl lg:text-4xl font-bold leading-tight md:leading-none mb-12 text-center">
      {children}
    </h1>
  );
};

export default PostTitle;
