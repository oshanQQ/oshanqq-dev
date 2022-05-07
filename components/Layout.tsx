import Footer from "./Footer";
import Meta from "./Meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen text-gray-700 font-display">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
