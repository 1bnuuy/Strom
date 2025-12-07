"use client";

import Link from "next/link";

import { motion } from "motion/react";
import { InteractScale } from "@/lib/motion";

import Navigation from "./nav";

const MotionLink = motion(Link);

export default function Header() {
  return (
    <div className="fixed left-1/2 flex w-11/12 max-w-[1440px] -translate-x-1/2 items-center justify-between px-4 py-3">
      <MotionLink
        variants={InteractScale}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        key="/"
        href="/"
        className="text-accent hover:text-accent-hovered active:text-accent-hovered text-4xl font-bold uppercase italic"
      >
        Strøm
      </MotionLink>

      <Navigation />
    </div>
  );
}
