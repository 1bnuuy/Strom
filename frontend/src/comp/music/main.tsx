"use client";

import { motion } from "framer-motion";
import { useUI } from "../assets/UI";
import { _Scale } from "@/lib/motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faAnglesUp,
  faBackward,
  faForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef } from "react";
import { usePlayer } from "./handler";

export default function Music() {
  const { visible, toggle } = useUI();
  const { state, dispatch } = usePlayer();

  const player = useRef<HTMLAudioElement>(null);
  const request = useRef<number | undefined>(undefined);

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentSong = state.song.find((s) => s.id === state.currentID);

  const animate = useCallback(() => {
    if (player.current && state.duration > 0) {
      const safeTime = Math.min(player.current.currentTime, state.duration); //Making sure the time not exceed 100%

      dispatch({ type: "TIME", payload: safeTime });

      request.current = requestAnimationFrame(animate); //Handles audio's current time
    }
  }, [state.duration, dispatch]);

  const handleCanPlay = () => {
    if (!state.pause) {
      player.current?.play();
    }
  };

  useEffect(() => {
    if (!state.pause) {
      request.current = requestAnimationFrame(animate);
    } else {
      if (request.current) cancelAnimationFrame(request.current);
    }

    return () => {
      if (request.current) cancelAnimationFrame(request.current);
    };
  }, [state.pause, animate]);

  useEffect(() => {
    const audio = player.current;
    if (!audio) return;

    if (!state.pause && audio.paused) {
      audio.play();
    } else if (state.pause && !audio.paused) {
      audio.pause();
    }
  }, [state.pause]);

  return (
    <motion.aside
      className={`fixed left-1/2 -translate-x-1/2 transition-[bottom] ${visible ? "bottom-2.5" : "-bottom-35"} z-50 h-18 w-11/12 max-w-[400px] min-w-[310px]`}
    >
      <div className="bg-tertiary absolute -top-17 left-1/2 -z-10 flex h-18 w-11/12 -translate-x-1/2 flex-col items-center justify-start gap-0.75 py-1.25 pr-3 pl-[150px] *:not-[span]:w-full">
        <p className="relative z-0 text-left text-lg font-bold">Music name</p>

        <div className="relative z-10 h-1">
          <input
            type="range"
            min={0}
            max={100}
            value={state.duration > 0 ? (state.time / state.duration) * 100 : 0}
            onChange={(e) => {
              const percent = Number(e.target.value);

              if (player.current)
                player.current.currentTime = (percent / 100) * state.duration;
            }}
            onMouseDown={() => {
              if (state.pause) {
                dispatch({ type: "PAUSE" });
              }
            }}
            onTouchStart={() => {
              if (state.pause) {
                dispatch({ type: "PAUSE" });
              }
            }}
            className={`custom-slider absolute z-20 size-full appearance-none outline-none`}
          />

          <span
            style={{
              width: `${state.duration > 0 ? (state.time / state.duration) * 100 : 0}%`,
            }}
            className="bg-accent absolute top-0 z-30 h-full"
          />
        </div>

        <div className="flex items-center justify-between font-semibold">
          <p>{formatTime(state.time)}</p>
          <p>{formatTime(state.duration)}</p>
        </div>

        <span className="border-contrast absolute top-0 left-0 h-full w-5 border-3 border-r-0" />
        <span className="border-contrast absolute top-0 right-0 h-full w-5 border-3 border-l-0" />
      </div>

      <div className="bg-tertiary border-contrast relative flex size-full items-center justify-between gap-10 border-3 px-4 py-2.5">
        <div
          // style={{
          //   boxShadow:
          //     currentSong?.theme.shadow &&
          //     `0 0 20px ${currentSong.theme.shadow}`,
          // }}
          className={`bg-accent relative -top-8 left-5 size-25 shrink-0 overflow-hidden rounded-full p-2`}
        >
          <Image
            src="/Pee.webp"
            alt="bnuuy"
            fill
            sizes="100px"
            className={`animate-spin object-cover object-center ${state.pause && "anim-pause"}`}
          />
        </div>

        <div className="flex w-full items-center justify-center gap-[15%] *:cursor-pointer">
          <button
            className="text-xl"
            onClick={() => {
              dispatch({ type: "PREVIOUS" });
            }}
          >
            <FontAwesomeIcon icon={faBackward} />
          </button>

          <button
            onClick={() => {
              dispatch({ type: "PAUSE" });
            }}
            className="text-3xl"
          >
            <FontAwesomeIcon icon={state.pause ? faPlay : faPause} />
          </button>

          <button
            className="text-xl"
            onClick={() => {
              dispatch({ type: "NEXT" });
            }}
          >
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>

      <motion.button
        variants={_Scale}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`border-contrast text-contrast ${visible ? "bg-accent" : "bg-accent-II"} absolute -top-27 left-1/2 z-50 flex h-7 w-[calc(91.67%-40px)] -translate-x-1/2 cursor-pointer items-center justify-center border-3 text-lg font-bold tracking-wide`}
        onClick={toggle}
      >
        <FontAwesomeIcon icon={visible ? faAnglesDown : faAnglesUp} />
      </motion.button>

      <audio
        muted
        ref={player}
        src={currentSong?.fileURL || undefined}
        onCanPlay={handleCanPlay}
        onLoadedMetadata={() =>
          dispatch({
            type: "DURATION",
            payload: player.current?.duration || 0,
          })
        }
        onEnded={() => {
          if (!currentSong) return;

          const currentIndex = state.song.findIndex(
            (s) => s.id === currentSong.id,
          );
          const isLast = currentIndex === state.song.length - 1;

          if (isLast) dispatch({ type: "PAUSE" });
          else dispatch({ type: "NEXT" });
        }}
        className="hidden"
        controls
      >
        Your browser does not support the audio element.
      </audio>
    </motion.aside>
  );
}
