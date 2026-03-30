"use client";

import { useEffect, useState } from "react";
import { DataType } from "./type";

const useGet = (url = `${process.env.NEXT_PUBLIC_API_URL}/data`) => {
  const [data, setData] = useState<DataType[] | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data!");

        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [url]);

  return data;
};

export default useGet;
