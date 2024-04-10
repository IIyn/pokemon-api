//@ts-nocheck
import request from "supertest";
import { app, server } from "../../src/app";

// TODO : mock token middleware

beforeAll(() => {
  process.env.NODE_ENV = "test";
});

afterAll((done: ((err?: Error | undefined) => void) | undefined) => {
  server.close(done);
});

describe("GET /pokemons", () => {
  it("should return 401 because we do not have cookies", async () => {
    const response = await request(app).get("/pokemons");
    expect(response.status).toBe(401);
  });

  // it("should return a list of pokemons", async () => {
  //   const response = await request(app).get("/pokemons");
  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       message: expect.any(String),
  //       data: expect.any(Array),
  //     })
  //   );
  // });
});

describe("GET /pokemons/:id", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/pokemons/1");
    expect(response.status).toBe(200);
  });

  it("should return a pokemon", async () => {
    const response = await request(app).get("/pokemons/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Object),
      })
    );
  });
});

describe("GET /pokemons/randoms/:set", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/pokemons/randoms/1");
    expect(response.status).toBe(200);
  });

  it("should return a set of random pokemons", async () => {
    const response = await request(app).get("/pokemons/randoms/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Array),
      })
    );
  });
});
