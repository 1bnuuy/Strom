"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { usePlayer } from "@/comp/music/handler";
import useGet from "@/comp/logic/get";

import { _Arise, _Scale, _Shift } from "@/lib/motion";

import Post from "@/comp/logic/post";
import { DataType } from "@/comp/logic/type";
import { musicInfo } from "./var";
import { useUI } from "@/comp/assets/UI";

export default function Menu() {
  const { visible, toggle } = useUI();
  const data = useGet();
  const [search, setSearch] = useState<string>("");
  const [hovered, setHovered] = useState<string | number | null>(null);
  const { state, dispatch } = usePlayer();

  const filteredSongs = useMemo(() => {
    return state.song.filter((item) => {
      return item.title?.toLowerCase().includes(search.toLowerCase());
    });
  }, [state.song, search]);

  return (
    <section className="content flex h-[calc(100dvh-50px)] w-full flex-col items-center justify-center gap-[45px]">
      <div className="flex w-full items-center justify-start gap-[25px]">
        <div className="relative h-[30px] w-[400px]">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-tertiary text-contrast size-full px-3 outline-none placeholder:text-gray-500"
          />

          <span className="border-contrast absolute left-0 h-full w-4 border-2 border-r-0" />
          <span className="border-contrast absolute right-0 h-full w-4 border-2 border-l-0" />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-contrast absolute top-1/2 right-2 -translate-y-1/2"
          />
        </div>

        <button>Sort</button>
      </div>

      <div className="custom-scroll bg-primary border-contrast box flex min-h-[250px] w-full flex-wrap items-center justify-evenly gap-5 overflow-x-hidden overflow-y-auto border-3 p-5">
        {musicInfo?.map((fS, i) => {
          const song: DataType = {
            id: fS.id,
            title: fS.title,
            artist: fS.artist,
            fileURL: fS.fileURL,
          };

          return (
            <motion.div
              variants={_Scale}
              initial="normal"
              whileHover="hover"
              whileTap="tap"
              animate={{
                opacity: hovered !== null && hovered !== fS.id ? 0.5 : 1,
                scale: hovered !== null && hovered !== fS.id ? 0.9 : 1,
              }}
              key={fS.id}
              onHoverStart={() => setHovered(fS.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => {
                if (state.currentID === null && visible === false) toggle();
                dispatch({ type: "SELECT", payload: song });
              }}
              className="text-contrast border-contrast relative h-[400px] w-[300px] cursor-pointer rounded-lg border-3 text-2xl font-semibold text-nowrap"
            >
              <span className="text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] opacity-10 select-none">
                {i + 1 > 0 && i + 1 < 10 ? `0${i + 1}` : i + 1}
              </span>

              <div className="bg-primary absolute -top-0.75 -right-0.75 flex w-[200px] items-center justify-center rounded-bl-lg border-b-3 border-l-3 pb-2 pl-2 text-center">
                <span className="border-contrast bg-secondary w-full rounded-tr-lg rounded-bl-lg border-3 px-4 py-1">
                  {fS.title}
                </span>
              </div>

              <div className="flex size-full items-center justify-center">
                <span>{fS.title}</span>
              </div>

              <div className="bg-primary absolute -bottom-0.75 -left-0.75 flex w-[125px] items-center justify-center rounded-tr-lg border-t-3 border-r-3 pt-2 pr-2 text-center">
                <span className="border-contrast bg-secondary w-full rounded-tr-lg rounded-bl-lg border-3 px-4 py-1">
                  {fS.artist}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Addition button */}
        <motion.div
          variants={_Scale}
          initial="normal"
          whileHover="hover"
          whileTap="tap"
          animate={{
            opacity: hovered !== null && hovered !== "add" ? 0.5 : 1,
            scale: hovered !== null && hovered !== "add" ? 0.9 : 1,
          }}
          key="add"
          onHoverStart={() => setHovered("add")}
          onHoverEnd={() => setHovered(null)}
          onClick={() =>
            Post({
              title: "PooPee's Song",
              artist: "PooPee",
              fileURL: "chase.mp3",
            })
          }
          className="text-contrast bg-success border-contrast relative h-[400px] w-[300px] cursor-pointer overflow-hidden rounded-lg border-3 border-dashed text-2xl font-semibold text-nowrap"
        >
          <span className="text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] opacity-50 select-none">
            +
          </span>

          <motion.span
            variants={_Arise}
            className="bg-accent pointer-events-none absolute bottom-0 flex w-full items-center justify-center"
          >
            NEW FILE
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
