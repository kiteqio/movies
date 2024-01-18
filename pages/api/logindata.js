
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("kieqiodbname");

  if (req.method === "GET") {
    try {
      const room = "kiteqiocollectnme"; // Hardcoded room value
  
      const messages = await db
        .collection(room)
        .find({})
        .sort({ _id: -1 })
        .limit(10)
        .toArray();
  
      res.json(messages);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      // Extract data from the request body
      const { email, message, room } = req.body;

      // Validate the data if needed
      console.log(message);

      // Insert the received data into the database
      const result = await db.collection(room).insertOne({
        email,
        message,
      });

      res.status(201).json({
        message: "Inserted Message successfully",
        insertedId: result.insertedId,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};