
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("message");

 if (req.method === "POST") {
    try {
      // Extract data from the request body
      const { email, message, room, fileuploadname } = req.body;

      // Validate the data if needed
      console.log(email);
      console.log(message);
      console.log(room);
      console.log(fileuploadname);


      // Insert the received data into the database
      const result = await db.collection(room).insertOne({
        email,
        fileuploadname,
        message
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