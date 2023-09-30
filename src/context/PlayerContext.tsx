"use client";

import { createContext } from "react";

import { Player } from "./types";

interface PlayerContextType {
  playerData: Player | null;
  setPlayerData: React.Dispatch<React.SetStateAction<Player | null>>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default PlayerContext;
