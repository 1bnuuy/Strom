"use client";

import { useState, useEffect } from "react";

export default function Wrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    
    }, []);

  if (!mounted) return null;

  return (
      <main
        className={`bg-primary min-h-dvh w-full overflow-hidden`}
      >
        {children}
      </main>
  );
}
