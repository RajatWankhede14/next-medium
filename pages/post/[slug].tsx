import { PortableText } from "@portabletext/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Header from "../../components/Header";
import { client, urlFor } from "../../sanity";
import { Comment, Post } from "../../typings";

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>();

  const submmitHandler: SubmitHandler<FormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        setSubmitted(true);
      })
      .catch((err) => {
        // console.log(err);
        setSubmitted(false);
      });
  };
  const createdDate = new Date(post?._createdAt).toDateString();
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>{post?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <img
        src={urlFor(post?.mainImage).url()}
        alt={post?.slug?.current}
        className="w-full h-20 object-cover"
      />
      <div className="max-w-4xl mx-auto p-3 md:px-8 md:py-6">
        <h3 className="text-4xl font-bold">{post?.title}</h3>
        <div className="mt-3 flex flex-row items-center space-x-3">
          <img
            className="w-20 h-20 rounded-full object-contain"
            src={urlFor(post?.author?.image).url()}
          />
          <div>
            <h4>
              Published by{" "}
              <span className="text-green-600">{post?.author?.name}</span>
            </h4>
            <h4>Published at {createdDate}</h4>
          </div>
        </div>
        <div className="my-3">
          <PortableText value={post?.body} />
        </div>
        <hr className="border border-yellow-500 max-w-3xl mx-auto my-5" />
        {submitted ? (
          <div className="max-w-xl mx-auto bg-yellow-500 p-8 my-8">
            <h2 className="font-bold text-xl ">
              Thanks for submitting your comment.
            </h2>
            <h3 className="font-thin text-xs">
              Comment will show-up as it is approved.
            </h3>
          </div>
        ) : (
          <form
            className="my-8 max-w-xl mx-auto"
            onSubmit={handleSubmit(submmitHandler)}
          >
            <h3 className="text-yellow-500 text-lg">Enjoyed this article?</h3>
            <h4 className="font-bold text-3xl mb-5">Leave a Comment below!</h4>
            <input
              type="hidden"
              value={post?._id.toString()}
              {...register("_id")}
            />
            <label className="block mb-5">
              <span>Name</span>
              <input
                className="block py-3 px-2 border form-input mt-1 ring-yellow-500 w-full rounded"
                type="text"
                {...register("name", { required: true })}
              />
            </label>
            {errors.name && (
              <p className="my-2 text-sm text-red-600">- Name is required</p>
            )}
            <label className="block mb-5">
              <span>Email</span>
              <input
                className="block py-3 px-2 border form-input mt-1 ring-yellow-500 w-full rounded"
                type="email"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && (
              <p className="my-2 text-sm text-red-600">- Email is required</p>
            )}
            <label className="block mb-5">
              <span>Comment</span>
              <textarea
                className="block py-3 px-2 border form-input mt-1 ring-yellow-500 w-full rounded"
                rows={4}
                {...register("comment", { required: true })}
              />
            </label>
            {errors.comment && (
              <p className="my-2 text-sm text-red-600">- Comment is required</p>
            )}
            <input
              type="submit"
              value="Submit"
              className="bg-yellow-500 text-white rounded block w-full hover:bg-yellow-400 py-2"
            />
          </form>
        )}
        {post?.comments.length > 0 ? (
          <div className="my-5 shadow-md shadow-yellow-500 max-w-2xl mx-auto py-6 px-3 space-y-4">
            <h3 className="text-2xl font-bold">Comments</h3>
            {post?.comments.map((comment: Comment) => (
              <div
                key={comment?._id}
                className="flex flex-row items-center space-x-2"
              >
                <h3 className=" text-yellow-500">{comment?.name}:</h3>
                <h3>{comment?.comment}</h3>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
        slug {
            current
        }
      }`;

  const data = await client.fetch(query);

  const paths = data.map((item: Post) => ({
    params: {
      slug: item?.slug?.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        author->{
          slug,
          name,
          image,
        },
        'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
        slug,
        title,
        mainImage,
        body
      }`;

  const post = await client.fetch(query, { slug: context?.params?.slug });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
