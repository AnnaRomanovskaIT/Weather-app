import { Router } from "express";
import validateRequest from "../validation/validation.js";
import weatherService from "../services/weather.service.js";

const router = Router();

router.get(
    "/weather",
    validateRequest.validateWeatherRequest,
    async (req, res, next) => {
        try {
            const latitude = Number(req.query.latitude);
            const longitude = Number(req.query.longitude);
            const locationName = typeof req.query.name === "string" ? req.query.name : "Unknown";

            const weather = await weatherService.getWeather(
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

router.get(
    "/weather/latest",
    validateRequest.validateLocationRequest,
    async (req, res, next) => {
        try {
            const locationName = req.query.name;
            
            const latestWeather =
                await weatherService.getLatestWeatherByLocationName(
                    locationName
                );

            if (!latestWeather) {
                return res.status(404).json({
                error: "Weather not found",
            });
            }  

            res.json(latestWeather);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/weather/:id",
    validateRequest.validateObjectIdRequest,
    async (req, res, next) => {
        try {
            const weatherId = req.params.id;
            
            const weather = await weatherService.getWeatherById(weatherId);
            res.json(weather);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
