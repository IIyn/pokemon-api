//@ts-nocheck
import axios from "axios";
import env from "../../src/config/env";

const { PORT, HOST } = env;

describe("Pokemon routes", () => {
  it("should return a list of pokemons", async () => {
    const response = await axios.get(`http://${HOST}:${PORT}/pokemons`);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return a pokemon by id", async () => {
    const response = await axios.get(`http://${HOST}:${PORT}/pokemons/1`);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return status 400 if pokemon id is not a number", async () => {
    try {
      await axios.get(`http://${HOST}:${PORT}/pokemons/abc`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  it("should return a random set of pokemons", async () => {
    const set = 3;
    const response = await axios.get(
      `http://${HOST}:${PORT}/pokemons/randoms/${set}`
    );
    console.log("DATA LENGTH", response.data.length);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return status 400 if set is not a number", async () => {
    try {
      await axios.get(`http://${HOST}:${PORT}/pokemons/randoms/abc`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
