import { db } from "@vercel/postgres";

export default async function handler(req, res) {
  console.log("Handling request");
  let client;
  try {
    client = await db.connect();
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return res.status(500).json({ error: "Error connecting to the database" });
  }

  // Handle GET requests
  if (req.method === "GET") {
    try {
      const events = await client.sql`SELECT * FROM Events;`;
      return res.status(200).json({ events });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // Handle POST requests
  if (req.method === "POST") {
    const { title, description, endDate } = req.body;

    try {
      await client.sql`
        INSERT INTO Events (title, description, endDate)
        VALUES (${title}, ${description}, ${endDate});
      `;
      return res.status(201).json({ message: "Event created" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // Close the connection
  client.release();
}
