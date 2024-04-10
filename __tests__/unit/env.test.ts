//@ts-nocheck
import env from "../../src/config/env";
import "jest";

describe("env variables", () => {
  it("should be test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should have a PORT", () => {
    expect(env.PORT).toBeDefined();
  });

  it("should have a HOST", () => {
    expect(env.HOST).toBeDefined();
  });

  it("should have a JWT_SECRET", () => {
    expect(env.JWT_SECRET).toBeDefined();
  });

  it("should have a REFRESH_SECRET", () => {
    expect(env.REFRESH_SECRET).toBeDefined();
  });

  it("should have a NODE_ENV", () => {
    expect(env.NODE_ENV).toBeDefined();
  });
});
