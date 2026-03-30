"use client";

import { useMemo, useReducer } from "react";

import { Card } from "./card";
import { InitialMusic, musicInfo, MusicReducer } from "./var";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
  const [state, dispatch] = useReducer(MusicReducer, InitialMusic);

  const filteredSongs = useMemo(() => {
    return state.song.filter((item) => {
      return item.name?.toLowerCase().includes(state.search.toLowerCase());
    });
  }, [state.song, state.search]);
  return (
    <section className="content flex h-[calc(100dvh-50px)] w-full flex-col items-center justify-center gap-[45px]">
      <div className="flex w-full items-center justify-start gap-[25px]">
        <div className="relative h-[30px] w-[400px]">
          <input
            placeholder="Search..."
            value={state.search}
            onChange={(e) =>
              dispatch({ type: "SEARCH", payload: e.target.value })
            }
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

      <div className="min-h-[200px] flex justify-evenly items-center flex-wrap gap-5 custom-scroll border-3 border-contrast box p-5 w-full overflow-x-hidden overflow-y-auto">
        {musicInfo.map((a) => {
          return <Card key={a.id} id={a.id} name={a.name} author={a.author} />;
        })}
      </div>

      <div className="fixed"></div>

      <div className="mt-auto">
        <audio controls>
          <source src="chase.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </section>
  );
}
