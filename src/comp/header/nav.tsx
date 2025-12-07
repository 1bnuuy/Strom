"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { AnimatePresence, motion } from "motion/react";
import { InteractScale } from "@/lib/motion";

import { links } from "./variables";

import Link from "next/link";

const MotionLink = motion(Link);

export default function Navigation() {
  return (
    <div className="flex items-center justify-center gap-5">
      <AnimatePresence>
        {links.map((link) => {
          return (
            <MotionLink
              variants={InteractScale}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              href={link.path}
              key={link.path}
              className="text-contrast hover:text-accent active:text-accent hidden text-xl md:block"
            >
              <span>{link.id}</span>
            </MotionLink>
          );
        })}
      </AnimatePresence>

      <div className="hidden cursor-pointer items-center justify-center max-md:flex">
        <FontAwesomeIcon
          icon={faBars}
          className="text-contrast hover:text-accent active:text-accent text-3xl"
        />
      </div>

      <MotionLink
        variants={InteractScale}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        href="/order"
        key="/order"
        className="hover:text-accent active:text-accent hover:border-accent active:border-accent border-contrast text-contrast hidden rounded-md border-2 px-3 py-1 text-xl font-semibold md:block"
      >
        Order
      </MotionLink>
    </div>
  );
}
