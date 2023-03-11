import { createClient } from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../sanity";
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: "2023-03-05", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_API_TOKEN,
};

const sanityClient = createClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = req.body;
  try {
    await sanityClient.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Comment not submitted.",
      error,
    });
  }
  res.status(200).json({ message: "Comment submitted." });
}
