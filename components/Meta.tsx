import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="oshanqq dev" content={`oshanqq's website`} />
      <meta property="og:image" content="http://oshanqq.dev/site_image.png" />
      <meta name="twitter:image" content="http://oshanqq.dev/site_image.png" />
      <meta name="twitter:title" content="oshanQQ-dev" />
      <meta name="twitter:site" content="@oshanQQ" />
      <meta name="twitter:description" content="oshanQQ's website" />
      <meta name="twitter:image" content="http://oshanqq.dev/site_image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content="oshanQQ-dev" />
      <meta property="og:description" content="oshanQQ's website" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://oshanqq.dev" />
    </Head>
  );
};

export default Meta;
