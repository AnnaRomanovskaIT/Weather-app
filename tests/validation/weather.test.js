import { it, describe } from "node:test";
import assert from "node:assert/strict";
import validator from "../../src/validation/validation.js";

describe("validateWeatherRequest", () => {
it("accepts valid coordinates", () => {
    const req = {
        query: {
            latitude: "51.1079",
            longitude: "17.0385",
        },
    };

    let nextCalled = false;

    const next = () => {
        nextCalled = true;
    };

    validator.validateWeatherRequest(req, {}, next);

    assert.equal(nextCalled, true);
});

it("rejects an invalid latitude", () => {
    const req = {
        query: {
            latitude: "invalid",
            longitude: "17.0385",
        },
    };

    let response;

    const res = {
        status(code) {
            response = { status: code };
            return this;
        },

        json(body) {
            response.body = body;
        },
    };

    let nextCalled = false;

    const next = () => {
        nextCalled = true;
    };

    validator.validateWeatherRequest(req, res, next);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Invalid coordinates");
    assert.equal(nextCalled, false);
});

it("rejects an invalid longitude", () => {
    const req = {
        query: {
            latitude: "51.1079",
            longitude: "invalid",
        },
    };

    let response;

    const res = {
        status(code) {
            response = { status: code };
            return this;
        },

        json(body) {
            response.body = body;
        },
    };

    let nextCalled = false;

    const next = () => {
        nextCalled = true;
    };

    validator.validateWeatherRequest(req, res, next);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Invalid coordinates");
    assert.equal(nextCalled, false);
});

it("rejects when both coordinates are invalid", () => {
    const req = {
        query: {
            latitude: "abc",
            longitude: "xyz",
        },
    };

    let response;

    const res = {
        status(code) {
            response = { status: code };
            return this;
        },

        json(body) {
            response.body = body;
        },
    };

    let nextCalled = false;

    const next = () => {
        nextCalled = true;
    };

    validator.validateWeatherRequest(req, res, next);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Invalid coordinates");
    assert.equal(nextCalled, false);
});

it("rejects latitude greater than 90", () => {
    const req = {
        query: {
            latitude: "91",
            longitude: "17",
        },
    };

    let response;

    const res = {
        status(code) {
            response = { status: code };
            return this;
        },

        json(body) {
            response.body = body;
        },
    };

    const next = () => {
        throw new Error("next() should not have been called");
    };

    validator.validateWeatherRequest(req, res, next);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Invalid coordinates");
});

it("rejects latitude less than -90", () => {
    const req = {
        query: {
            latitude: "-91",
            longitude: "17",
        },
    };

    let response;

    const res = {
        status(code) {
            response = { status: code };
            return this;
        },

        json(body) {
            response.body = body;
        },
    };

    const next = () => {
        throw new Error("next() should not have been called");
    };

    validator.validateWeatherRequest(req, res, next);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Invalid coordinates");
});

it("rejects longitude greater than 180", () => {
    const req = {
        query: {
            latitude: "51",
            longitude: "181",
        },
    };

    let response;

    const res = {
        status(code) {
            response = { status: code };
            return this;
        },

        json(body) {
            response.body = body;
        },
    };

    const next = () => {
        throw new Error("next() should not have been called");
    };

    validator.validateWeatherRequest(req, res, next);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Invalid coordinates");
});

it("rejects longitude less than -180", () => {
    const req = {
        query: {
            latitude: "51",
            longitude: "-181",
        },
    };

    let response;

    const res = {
        status(code) {
            response = { status: code };
            return this;
        },

        json(body) {
            response.body = body;
        },
    };

    const next = () => {
        throw new Error("next() should not have been called");
    };

    validator.validateWeatherRequest(req, res, next);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Invalid coordinates");
});

});
