import { describe, it } from "node:test";
import assert from "node:assert/strict";
import validator from "../../src/validation/validation.js";

describe("validateObjectIdRequest", () => {
    it("should accept a valid MongoDB ObjectId", () => {
        const req = {
            params: {
                id: "6adb72179c81aa468e5d152c",
            },
        };

        const res = {
            status: () => res,
            json: () => {},
        };

        let nextCalled = false;

        const next = () => {
            nextCalled = true;
        };

        validator.validateObjectIdRequest(req, res, next);

        assert.equal(nextCalled, true);
    });

    it("should reject an invalid ObjectId", () => {
        const req = {
            params: {
                id: "hello",
            },
        };

        let statusCode;
        let responseBody;

        const res = {
            status(code) {
                statusCode = code;
                return this;
            },
            json(body) {
                responseBody = body;
            },
        };

        const next = () => {
            throw new Error("next should not be called");
        };

        validator.validateObjectIdRequest(req, res, next);

        assert.equal(statusCode, 400);
        assert.deepEqual(responseBody, {
            error: "Invalid weather ID",
        });
    });
});
