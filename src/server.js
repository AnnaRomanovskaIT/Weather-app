import express from "express";
import WeatherRouter from "./routes/weather.route.js";
import { connectToMongo } from "./db/mongo.js";
import { config } from "./config/config.js";

const app = express();

await connectToMongo();

app.use("/api", WeatherRouter);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
