import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ObjectId } from "mongodb";
import { mapMongoDocumentToWeather } from "../../src/models/weather/weather.mapper.js";

describe("mapMongoDocumentToWeather", () => {
    it("should map MongoDB _id to application id", () => {
        const document = {
            _id: new ObjectId("6adb72179c81aa468e5d152c"),
            date: "2026-10-23",
            location: {
                name: "Wroclaw",
                latitude: 51.09412,
                longitude: 17.008299,
            },
            forecast: [],
            createdAt: new Date(),
        };

        const result = mapMongoDocumentToWeather(document);

        assert.equal(result.id, "6adb72179c81aa468e5d152c");
        assert.equal(result.date, "2026-10-23");
        assert.deepEqual(result.location, document.location);
        assert.deepEqual(result.forecast, []);
    });

    it("should return null when document is null", () => {
        const result = mapMongoDocumentToWeather(null);

        assert.equal(result, null);
    });
});
