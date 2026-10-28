function validateWeatherRequest(req, res, next) {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);

    if (
        Number.isNaN(latitude) ||
        Number.isNaN(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
    ) {
        return res.status(400).json({
            error: "Invalid coordinates",
        });
    }

    next();
}

function validateObjectIdRequest(req, res, next) {
    const { id } = req.params;

    if (typeof id !== "string" || !/^[a-f\d]{24}$/i.test(id)) {
        return res.status(400).json({
            error: "Invalid weather ID",
        });
    }

    next();
}

function validateLocationRequest(req, res, next) {
    const name = req.query.name;

    if (!validateLocationName(name, res)) {
        return;
    }

    next();
}

function validateLocationName(name, res) {
    if (typeof name !== "string") {
        res.status(400).json({
            error: "Location name is required",
        });
        return false;
    }

    if (name.trim().length === 0) {
        res.status(400).json({
            error: "Location name cannot be empty",
        });
        return false;
    }

    if (name.length > 100) {
        res.status(400).json({
            error: "Location name should not exceed 100 characters",
        });
        return false;
    }

    if (!/[\p{L}]/u.test(name)) {
        res.status(400).json({
            error: "Location name must contain at least one letter",
        });
        return false;
    }

    return true;
}

export default {
    validateWeatherRequest,
    validateLocationRequest,
    validateObjectIdRequest,
};
