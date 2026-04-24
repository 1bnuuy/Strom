import { API_URL } from "../api";
import { RegisterType } from "../type";

export const REGISTER = async ({ username, password }: RegisterType) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Spent 2 hours debugging cookie not storing in browser, eventually found out that I didnt include this mf
    });

    if (!res.ok) {
      const errorBody = await res.json();

      throw new Error(JSON.stringify(errorBody, null, 2));
    }

    const result = await res.json();

    if (result && result.accessToken) {
      localStorage.setItem("token", result.accessToken);
    } else {
      console.warn("No token");
    }

    console.log(result.message);

    return result;
  } catch (err) {
    throw err;
  }
};
