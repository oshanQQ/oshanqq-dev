import Link from "next/link";

const Header = () => {
  return (
    <h2 className="flex text-xl lg:text-2xl font-bold px-8 lg:px-48 mt-10 mb-12 lg:mb-20 justify-between">
      <Link href="/">
        <a>oshanQQ-dev</a>
      </Link>
      <Link href="/posts/about">
        <a>about</a>
      </Link>
    </h2>
  );
};

export default Header;
