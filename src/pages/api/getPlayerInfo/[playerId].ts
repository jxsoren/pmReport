import { NextApiRequest, NextApiResponse } from "next";

const getPlayerInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = req.query.playerId as string;

  const url = `https://www.bungie.net/Platform/User/GetBungieNetUserById/${playerId}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.X_API_KEY) {
    headers["X-API-Key"] = process.env.X_API_KEY;
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default getPlayerInfo;
