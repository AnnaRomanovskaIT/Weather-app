import { MongoClient } from "mongodb";
import { config } from "../config/config.js";

const client = new MongoClient(config.mongodbUri);

let db;

export async function connectToMongo() {
    await client.connect();

    db = client.db();

    console.log("Connected to MongoDB");

    return db;
}

export function getDb() {
    if (!db) {
        throw new Error("Database is not connected");
    }

    return db;
}
