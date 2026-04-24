"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { DataContextType, DataType } from "./type";
import { API_URL } from "./api";
import { clientReload } from "./client";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used inside DataProvider");

  return context;
};

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const FETCH = async () => {
    setLoading(true);

    try {
      const resAuth = await clientReload({
        url: `${API_URL}/dashboard`,
        options: { credentials: "include" },
      });

      if (!resAuth.ok) {
        setAuthenticated(false);
        return;
      }

      const auth = await resAuth.json();
      setAuthenticated(true);
      setUsername(auth.username);

      const resData = await clientReload({
        url: `${API_URL}/data`,
        options: { credentials: "include" },
      });

      if (!resData.ok) throw new Error("Fetch failed");

      const data = await resData.json();
      setData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setAuthenticated(false);
      console.error("Fetch error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FETCH();
  }, []);

  return (
    <DataContext.Provider
      value={{ data, FETCH, loading, authenticated, username }}
    >
      {children}
    </DataContext.Provider>
  );
}
