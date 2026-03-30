"use client";

import { PostType } from "./type";

const Post = async ({ title, artist, fileURL }: PostType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      artist,
      fileURL,
    }),
  });

  if (!res.ok) throw new Error("Failed to create track!");

  return res.json();
};

export default Post;
