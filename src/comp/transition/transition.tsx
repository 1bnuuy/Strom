"use client";

import { AnimsProps } from "@/lib/motion";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location}>
        {[
          Array.from({ length: 5 }).map((_, index: number) => {
            const left = index * 20;
            const delay = index * 0.09;
            const origin = index % 2 === 0 ? "top" : "bottom";

            return (
              <motion.span
                key={index}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{
                  duration: AnimsProps.animDuration - 0.1,
                  delay: delay,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                style={{ left: `${left}vw`, transformOrigin: `${origin}` }}
                className="bg-secondary fixed z-50 h-screen w-[21vw]"
              />
            );
          }),
        ]}
        <motion.div
          key="content"
          initial={{ opacity: 0, transition: { duration: 0 } }}
          animate={{
            opacity: 1,
            transition: { delay: AnimsProps.animDelay - 0.05 },
          }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
