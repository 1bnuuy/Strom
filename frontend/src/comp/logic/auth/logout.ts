import { API_URL } from "../api";
import { clientReload } from "../client";

export const LOGOUT = async () => {
  try {
    const res = await clientReload({
      url: `${API_URL}/auth/logout`,
      options: {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();

      throw new Error(JSON.stringify(errorBody, null, 2));
    }

    localStorage.clear();

    return console.log("Logged out successfully");
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};
