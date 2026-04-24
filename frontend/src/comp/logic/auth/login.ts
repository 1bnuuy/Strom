import { API_URL } from "../api";
import { LoginType } from "../type";

export const LOGIN = async ({ username, password }: LoginType) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json();

      throw new Error(JSON.stringify(errorBody, null, 2));
    }

    const result = await res.json();

    if (result && result.accessToken) {
      localStorage.setItem("token", result.accessToken);
      console.log(result.message);

      return result;
    } else {
      console.warn("No token");
      return result;
    }
  } catch (err) {
    throw err;
  }
};
