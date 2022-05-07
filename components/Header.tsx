import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-xl lg:text-2xl font-bold px-8 lg:px-48 mt-10 mb-12 lg:mb-20">
      <Link href="/">
        <a>oshanQQ-dev</a>
      </Link>
    </h2>
  );
};

export default Header;
