import markdownStyles from "./markdown-styles.module.css";
import "zenn-content-css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-14 py-10 rounded-xl bg-white font-display">
      <div className={markdownStyles["markdown"]}>
        <div className="znc" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default PostBody;
