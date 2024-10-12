import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello, world!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
