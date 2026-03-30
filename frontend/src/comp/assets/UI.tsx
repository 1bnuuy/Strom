"use client";

import { createContext, useContext, useState } from "react";
import { ToggleContextType } from "./type";

const UIContext = createContext<ToggleContextType | undefined>(undefined);
export const useUI = (): ToggleContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return context;
};

export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisibility] = useState(false);

  const toggle = () => {
    setVisibility(!visible);
  };

  return (
    <UIContext.Provider value={{ visible, toggle }}>
      {children}
    </UIContext.Provider>
  );
}