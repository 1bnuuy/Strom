import { API_URL } from "../api";
import { clientReload } from "../client";
import { DeleteType } from "../type";

export const DELETE = async ({ id, ...updates }: DeleteType) => {
  try {
    const res = await clientReload({
      url: `${API_URL}/data/${id}`,
      options: {
        method: "DELETE",
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

    if (res.status === 204) return null;

    return console.log("Track deleted successfully");
  } catch (err) {
    throw err;
  }
};
