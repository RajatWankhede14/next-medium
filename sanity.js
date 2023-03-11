import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: "2023-03-05", // use current date (YYYY-MM-DD) to target the latest API version
};

export const client = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
