import Footer from "./Footer";
import Meta from "./Meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title = "oshanQQ-dev" }: Props) => {
  return (
    <>
      <Meta title={title} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
