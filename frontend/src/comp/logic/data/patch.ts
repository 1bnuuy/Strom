import { API_URL } from "../api";
import { clientReload } from "../client";
import { PatchType } from "../type";

//This destructure the id while collecting the rest as "updates" (title, artist,...)
export const PATCH = async ({ id, ...updates }: PatchType) => {
  try {
    const res = await clientReload({
      url: `${API_URL}/data/${id}`,
      options: {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updates),
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();

      throw new Error(JSON.stringify(errorBody, null, 2));
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};
