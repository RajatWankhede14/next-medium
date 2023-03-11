import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

function Posts({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
      {posts.map((post) => (
        <Link href={`/post/${post?.slug?.current}`} key={post?._id}>
          <div className="border rounded-lg group overflow-hidden cursor-pointer">
            <img
              src={urlFor(post?.mainImage).url()}
              alt={post?.slug?.current}
              className="h-60 w-full rounded-t-lg object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
            />
            <div className="flex items-center justify-between p-2 border">
              <section>
                <h3 className="font-bold">{post?.title}</h3>
                <h3>
                  By{" "}
                  <span className="text-green-500">{post?.author?.name}</span>
                </h3>
              </section>
              <img
                src={urlFor(post?.author?.image).url()}
                alt={post?.author?.slug}
                className="w-14 h-14 rounded-full object-contain"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
