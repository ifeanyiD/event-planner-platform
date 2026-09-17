import { 
    describe, 
    it, 
    expect,
    beforeAll,
    afterAll,
    beforeEach
} from "vitest";

import { clearTestDB, connectTestDB } from "./setup.js";

import request from "supertest";

import app from "../app.js";

beforeAll(async () => {
    await connectTestDB();
});

beforeEach(async () => {
    await clearTestDB();
});

afterAll(async () => {
    await clearTestDB();
});

describe("Express application", () => {

    it("should respond to an unknown route with 404", async () => {

        const response = await request(app)
            .get("/this-route-does-not-exist");

        expect(response.status).toBe(404);

    });


    it("should reject login when credentials are missing", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({});

        expect(response.status).toBe(401);

    });

});