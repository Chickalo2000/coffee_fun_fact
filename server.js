"use strict";

require("dotenv").config();
console.log("Mongo URI:", uri);

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const path = require("path");
const port = 3000;

app.use("", express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try{
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToDatabase();

app.get("/coffee-facts", async (req, res) => {
  try {
    const database = client.db("coffeeshoppee");
    const collection = database.collection("coffeefunfacts");

const query={category:"coffee"};
const coffeeFacts = await collection.find(query).toArray();
  
if (coffeeFacts.length === 0) {
    res.status(404).json({ message: "No coffee facts found" });
  }else{
    res.json(coffeeFacts);
  }
}catch (error) {
    console.error("Error fetching coffee facts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
  
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
  console.log(`Press Ctrl + C to stop the server`);
});