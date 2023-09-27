"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Player {
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
  bungieNetMembershipId: string;
  profilePicturePath: string;
  destinyMemberships: Array<{
    iconPath: string;
    displayName: string;
    membershipType: number;
    membershipId: string;
  }>;
}

const SearchPlayer = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState<Player | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const searchPlayer = async () => {
    try {
      const response = await fetch("/api/searchPlayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch player data");
      }

      const data = await response.json();
      if (data.Response && data.Response.searchResults.length > 0) {
        setPlayerData(data.Response.searchResults[0]);
        const playerId = data.Response.searchResults[0].bungieNetMembershipId;
        getPlayerInfo(playerId);
      } else {
        console.error("Player not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPlayerInfo = async (playerId: string) => {
    try {
      const response = await fetch(`/api/getPlayerInfo/${playerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setPlayerData((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            profilePicturePath: data.Response.profilePicturePath,
          };
        }
        return null;
      });

      console.log(playerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Search Player</h1>

      <div>
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={handleInputChange}
        />
        <button onClick={searchPlayer}>Search</button>
      </div>

      {playerData && (
        <div>
          <h2>
            {`${playerData.bungieGlobalDisplayName} #${playerData.bungieGlobalDisplayNameCode}`}
          </h2>
          <h2>{playerData.bungieNetMembershipId}</h2>
          <Image
            src={playerData.profilePicturePath}
            alt="profileImage"
            height={200}
            width={200}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPlayer;
