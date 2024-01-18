import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("kieqiodbname");

  if (req.method === "POST") {
    try {
      // Extract data from the request body
      const { email, id, fileuploadname } = req.body;

      // Validate the data if needed
      // Example: You might want to check if email and id are provided

      // Insert the received data into the database
      const result = await db.collection("kiteqiocollectnme").insertOne({
        email,
        id,
        fileuploadname
      });

      res.status(201).json({
        message: "Inserted data successfully",
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
