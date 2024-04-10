//@ts-nocheck
import { AuthService } from "../../src/domain/services/AuthService";
import { User } from "../../src/domain/entities/User";
import { UserRepository } from "../../src/infrastructure/repositories/UserRepository";

const authService = new AuthService();
const userRepository = new UserRepository();
const user: User = {
  id: "test",
  username: "test",
  password: "test",
  refreshToken: "test",
};

beforeAll(() => {
  authService.createUser(user);
});

afterAll(() => {
  authService.deleteUser(user.id);
});

describe("Auth", () => {
  it("should return a user by username", () => {
    const userAssert = authService.getUserByUsername("test");
    expect(userAssert).toBeDefined();
    expect(userAssert).toEqual(user);
  });

  it("should load users.json", () => {
    expect(userRepository).toBeDefined();
  });

  it("should verify if user exists", () => {
    const userAssert = authService.getUserByUsername("test");
    expect(userAssert).toBeDefined();
    expect(userAssert).toEqual(user);
  });
});
