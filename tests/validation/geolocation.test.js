import { it, describe } from "node:test";
import assert from "node:assert/strict";
import validator from "../../src/validation/validation.js";

describe("validateLocationRequest", () => {
    it("accepts a valid location name", () => {
        const req = {
            query: {
                name: "Wrocław",
            },
        };

        let nextCalled = false;

        const next = () => {
            nextCalled = true;
        };

        validator.validateLocationRequest(req, {}, next);

        assert.equal(nextCalled, true);
    });

    it("rejects an empty location name", () => {
        const req = {
            query: {
                name: "",
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

        validator.validateLocationRequest(req, res, next);

        assert.equal(response.status, 400);
        assert.equal(response.body.error, "Location name cannot be empty");
        assert.equal(nextCalled, false);
    });

    it("rejects a missing location name", () => {
        const req = {
            query: {},
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

        validator.validateLocationRequest(req, res, next);

        assert.equal(response.status, 400);
        assert.equal(response.body.error, "Location name is required");
        assert.equal(nextCalled, false);
    });

    it("rejects a location name containing no letters", () => {
        const req = {
            query: {
                name: "@^!&@!&$",
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

        validator.validateLocationRequest(req, res, next);

        assert.equal(response.status, 400);
        assert.equal(response.body.error, "Location name must contain at least one letter");
        assert.equal(nextCalled, false);
    });
});
