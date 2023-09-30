"use client";

import React, { useState } from "react";
import PlayerContext from "./PlayerContext";

import { Player } from "./types";

interface PlayerContextProps extends Player {
  setPlayerData: (id: string, type: number) => void;
}

const PlayerProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Player | null>(null);

  const setPlayerData = (newPlayerData: Player | null) => {
    setPlayer(newPlayerData);
  };
  return (
    <PlayerContext.Provider
      value={{ playerData: player, setPlayerData: setPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
