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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
          consectetur adipiscing elit duis tristique. Volutpat diam ut venenatis
          tellus in metus vulputate eu scelerisque. Sed augue lacus viverra
          vitae congue eu consequat ac. Egestas diam in arcu cursus euismod.
          Massa vitae tortor condimentum lacinia quis vel eros donec ac. Lorem
          ipsum dolor sit amet consectetur adipiscing elit. Ut ornare lectus sit
          amet. Aliquam vestibulum morbi blandit cursus. Faucibus ornare
          suspendisse sed nisi. Velit aliquet sagittis id consectetur purus.
          Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Quam
          adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Vel
          orci porta non pulvinar neque. Nisl vel pretium lectus quam. Aliquet
          sagittis id consectetur purus ut faucibus pulvinar elementum. Nec
          feugiat nisl pretium fusce id velit ut. Vitae et leo duis ut diam
          quam. Viverra vitae congue eu consequat ac felis donec. Auctor eu
          augue ut lectus. A diam maecenas sed enim ut sem. Netus et malesuada
          fames ac turpis egestas. In tellus integer feugiat scelerisque varius
          morbi enim nunc. Orci dapibus ultrices in iaculis nunc sed augue
          lacus. Leo a diam sollicitudin tempor id eu. In cursus turpis massa
          tincidunt dui ut ornare. Ullamcorper dignissim cras tincidunt lobortis
          feugiat vivamus at augue eget. Dictum sit amet justo donec enim diam
          vulputate. Ligula ullamcorper malesuada proin libero nunc consequat
          interdum varius sit. Diam vel quam elementum pulvinar. Libero nunc
          consequat interdum varius sit. Augue mauris augue neque gravida in
          fermentum. Odio pellentesque diam volutpat commodo sed egestas egestas
          fringilla. Convallis a cras semper auctor neque vitae. Adipiscing
          bibendum est ultricies integer quis. Vel eros donec ac odio tempor
          orci dapibus ultrices in. Tincidunt id aliquet risus feugiat in ante
          metus dictum at. Convallis posuere morbi leo urna molestie at. Eget
          lorem dolor sed viverra ipsum nunc aliquet bibendum. Dictum sit amet
          justo donec. Etiam dignissim diam quis enim lobortis scelerisque
          fermentum dui. Ut venenatis tellus in metus vulputate eu scelerisque
          felis. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus.
          Vitae aliquet nec ullamcorper sit. Sit amet mattis vulputate enim
          nulla. Etiam non quam lacus suspendisse faucibus. Non curabitur
          gravida arcu ac tortor dignissim. Massa ultricies mi quis hendrerit
          dolor magna eget. Tortor consequat id porta nibh venenatis cras sed
          felis. Dolor sit amet consectetur adipiscing elit pellentesque. Sed
          risus pretium quam vulputate dignissim suspendisse in est. Dis
          parturient montes nascetur ridiculus mus mauris. Laoreet non curabitur
          gravida arcu ac tortor dignissim. Eu turpis egestas pretium aenean
          pharetra magna. Cras fermentum odio eu feugiat pretium nibh. Ultrices
          eros in cursus turpis massa tincidunt dui ut ornare. Pharetra magna ac
          placerat vestibulum. Sit amet cursus sit amet dictum sit amet. Vel
          orci porta non pulvinar neque laoreet suspendisse. In hac habitasse
          platea dictumst quisque sagittis purus sit. Duis tristique
          sollicitudin nibh sit amet commodo. Leo integer malesuada nunc vel
          risus commodo viverra maecenas. Cras tincidunt lobortis feugiat
          vivamus. Enim eu turpis egestas pretium aenean pharetra. Lobortis
          scelerisque fermentum dui faucibus in ornare quam viverra orci.
          Aliquet lectus proin nibh nisl condimentum id venenatis a. Non blandit
          massa enim nec dui nunc mattis. Sollicitudin aliquam ultrices sagittis
          orci a scelerisque. Sodales ut etiam sit amet nisl purus in mollis
          nunc. Massa sed elementum tempus egestas sed. Iaculis nunc sed augue
          lacus viverra. Condimentum vitae sapien pellentesque habitant morbi
          tristique. Vitae congue mauris rhoncus aenean vel elit scelerisque.
          Eget nullam non nisi est sit. Faucibus ornare suspendisse sed nisi.
          Ante in nibh mauris cursus mattis molestie. A diam maecenas sed enim.
          Duis ut diam quam nulla porttitor massa. Amet massa vitae tortor
          condimentum lacinia quis vel. Tristique risus nec feugiat in fermentum
          posuere urna nec. Dictum sit amet justo donec. Donec et odio
          pellentesque diam volutpat commodo sed egestas. Netus et malesuada
          fames ac turpis egestas. Et tortor consequat id porta. Eget mi proin
          sed libero. Ullamcorper a lacus vestibulum sed arcu non. Mauris augue
          neque gravida in fermentum et sollicitudin ac. Nulla facilisi etiam
          dignissim diam quis enim lobortis. Orci ac auctor augue mauris augue
          neque. Viverra ipsum nunc aliquet bibendum enim facilisis gravida.
          Tortor at risus viverra adipiscing at in tellus. Eu ultrices vitae
          auctor eu augue ut. Mi ipsum faucibus vitae aliquet nec ullamcorper
          sit. Enim diam vulputate ut pharetra sit amet. Et magnis dis
          parturient montes nascetur ridiculus mus. Adipiscing bibendum est
          ultricies integer quis auctor. Netus et malesuada fames ac turpis
          egestas integer eget. Urna et pharetra pharetra massa. Tellus rutrum
          tellus pellentesque eu tincidunt tortor aliquam. Quis auctor elit sed
          vulputate. Nulla posuere sollicitudin aliquam ultrices. Dolor magna
          eget est lorem ipsum dolor sit amet. Sem et tortor consequat id porta
          nibh. In hendrerit gravida rutrum quisque non tellus orci ac auctor.
          Eget nunc scelerisque viverra mauris in aliquam. Tristique magna sit
          amet purus gravida quis blandit turpis. Sed lectus vestibulum mattis
          ullamcorper velit sed ullamcorper. Eget nullam non nisi est sit amet
          facilisis magna etiam. Risus nec feugiat in fermentum posuere urna.
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
