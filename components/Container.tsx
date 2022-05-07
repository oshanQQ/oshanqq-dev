import { ReactNode, FunctionComponent } from "react";

type Props = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
  return (
    <div className="container mx-auto px-5 text-[#1E1E1E]">{children}</div>
  );
};

export default Container;
