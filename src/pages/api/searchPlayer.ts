import { NextApiRequest, NextApiResponse } from 'next';

interface SearchRequestBody {
  playerName: string;
}

const searchPlayer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { playerName } = req.body as SearchRequestBody;
  const url = "https://www.bungie.net/Platform/User/Search/GlobalName/0";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.X_API_KEY) {
    headers["X-API-Key"] = process.env.X_API_KEY;
  }
  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({ displayNamePrefix: playerName }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default searchPlayer;
