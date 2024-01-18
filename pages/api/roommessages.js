

import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("message");

  if (req.method === "GET") {
    try {
      const { room } = req.query;

      if (!room) {
        return res.status(400).json({ error: "Room parameter is required for GET requests" });
      }

      const messages = await db
        .collection(room)
        .find({})
        .sort({ _id: -1 }) // assuming _id is the timestamp
        .limit(10)
        .toArray();

      res.json(messages);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

