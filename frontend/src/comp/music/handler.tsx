"use client";

import { createContext, useContext, useReducer } from "react";
import { InitialPlayer, PlayerReducer } from "./var";
import { PlayerContextType } from "./type";

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }
  return context;
};

export default function PlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(PlayerReducer, InitialPlayer);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}
