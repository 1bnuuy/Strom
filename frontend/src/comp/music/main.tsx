"use client";

import { motion } from "framer-motion";
import { useUI } from "../assets/UI";
import { _Scale } from "@/lib/motion";
import Image from "next/image";

export default function Music() {
  const { visible, toggle } = useUI();

  return (
    //NextJS doesnt respect height in a layout component (bruh?)
    <motion.aside
      className={`fixed transition-[bottom] ${visible ? "bottom-2.5" : "-bottom-34"} min-w-[310px] z-50 flex h-18 w-11/12 max-w-[475px] flex-col items-center justify-between gap-2`}
    >
      <div className="bg-tertiary absolute -top-15 left-1/2 -z-10 h-17.5 w-11/12 -translate-x-1/2">
        <p className="relative z-0 w-full text-center text-2xl font-bold">
          Music name
        </p>
        <p className="text-lg font-semibold">Author</p>

        <span className="border-contrast absolute top-0 left-0 h-full w-5 border-3 border-r-0" />
        <span className="border-contrast absolute top-0 right-0 h-full w-5 border-3 border-l-0" />
      </div>

      <div className="bg-tertiary border-contrast relative flex h-full w-full items-center justify-start gap-2 border-3 px-3 py-2.5">
        <div className="bg-accent absolute -top-6 left-6.5 size-20 overflow-hidden rounded-lg p-2 shadow-lg">
          <Image
            src="/Pee.webp"
            alt="bnuuy"
            fill
            sizes="220px"
            className="object-cover object-center"
          />
        </div>

        <div className="ml-auto flex justify-center items-center gap-4">
          <button>Rewind</button>
          <button>Play</button>
          <button>Forward</button>
        </div>
      </div>

      <motion.button
        variants={_Scale}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="border-contrast text-contrast-II bg-error hover:bg-accent-II active:bg-accent-II absolute -top-25 right-4.75 z-50 flex h-8 w-15 cursor-pointer items-center justify-center border-3 text-xl font-bold tracking-wide"
        onClick={toggle}
      >
        {visible ? "HIDE" : "SHOW"}
      </motion.button>
    </motion.aside>
  );
}
