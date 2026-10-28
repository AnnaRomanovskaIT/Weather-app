import { Router } from "express";
import validateRequest from "../validation/validation.js";
import weatherService from "../services/weather.service.js";

const router = Router();

router.get(
    "/weather/hourly",
    validateRequest.validateWeatherRequest,
    async (req, res, next) => {
        try {
            const latitude = Number(req.query.latitude);
            const longitude = Number(req.query.longitude);
            const locationName = typeof req.query.name === "string" ? req.query.name : "Unknown";
            const date = req.query.date || null;
            const weather = await weatherService.getHourlyWeather(
                latitude,
                longitude,
                locationName,
                date
            );

            res.json(weather);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/weather/daily",
    validateRequest.validateWeatherRequest,
    async (req, res, next) => {
        try {
            const latitude = Number(req.query.latitude);
            const longitude = Number(req.query.longitude);
            const locationName = typeof req.query.name === "string" ? req.query.name : "Unknown";

            const weather = await weatherService.getDailyWeather(
                latitude,
                longitude,
                locationName
            );

            res.json(weather);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/locations",
    validateRequest.validateLocationRequest,
    async (req, res, next) => {
        try {
            const name = req.query.name;
            const locale = req.query.locale;

            const geolocation = await weatherService.getGeolocation(
                name,
                locale
            );

            res.json(geolocation);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
