import { API_URL } from "../api";
import { clientReload } from "../client";
import { PostType } from "../type";

export const POST = async ({ cover, title, artist, file }: PostType) => {
  try {
    const formData = new FormData();

    const track = {
      cover,
      title,
      artist,
    };

    formData.append(
      "track",
      new Blob([JSON.stringify(track)], {
        type: "application/json",
      }),
    );

    formData.append("file", file);

    const res = await clientReload({
      url: `${API_URL}/data`,
      options: {
        method: "POST",
        body: formData,
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();

      throw new Error(JSON.stringify(errorBody, null, 2));
    }

    return console.log("YO");
  } catch (err) {
    throw err;
  }
};
