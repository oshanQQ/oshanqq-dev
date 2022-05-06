import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ReactMarkdown from "react-markdown";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ReactMarkdown># Hello, *world*!</ReactMarkdown>
    </div>
  );
};

export default Home;
