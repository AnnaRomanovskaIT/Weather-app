import { getDb } from "../db/mongo.js";
import { ObjectId } from "mongodb";
import { mapMongoDocumentToWeather } from "../models/weather/weather.mapper.js";

const COLLECTION_NAME = "weather-hourly";

export async function saveHourly(weather) {
    const db = getDb();

    const document = { ...weather };
    delete document.id;

    const result = await db.collection(COLLECTION_NAME).insertOne(document);

    return {
        ...document,
        id: result.insertedId.toString(),
    };
}

export async function findById(id) {
    const db = getDb();

    const document = await db.collection(COLLECTION_NAME).findOne({
        _id: new ObjectId(id),
    });

    return mapMongoDocumentToWeather(document);
}

export async function findLatestByLocationAndDate(latitude, longitude, date) {
    const db = getDb();
    const document = await db
        .collection(COLLECTION_NAME)
        .findOne(
            { "location.latitude": latitude, "location.longitude": longitude, "date": date },
            { sort: { createdAt: -1 } }
        );
    return mapMongoDocumentToWeather(document);
}
