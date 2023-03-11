import { GetServerSideProps } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { client } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  // console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <Posts posts={posts} />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    author->{
      slug,
      name,
      image
    },
    mainImage,
    title,
    body,
    slug,
  }`;

  const posts = await client.fetch(query);

  return {
    props: { posts },
  };
};
