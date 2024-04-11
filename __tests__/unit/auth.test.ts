//@ts-nocheck
import { AuthService } from "../../src/domain/services/AuthService";
import { User } from "../../src/domain/entities/User";
import { UserRepository } from "../../src/infrastructure/repositories/UserRepository";

const authService = new AuthService();
const userRepository = new UserRepository();
const user: User = {
  username: "test",
  password: "test",
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

  it("should update a user", () => {
    const userAssert = authService.getUserByUsername("test");
    userAssert.username = "test2";
    userAssert.password =
      "$2b$10$8bi4O6lkwrduYTqeKtu74unScMFvzDz1RFwogSYySk2ShkWtFSosi"; // -> "password"
    authService.updateUser(userAssert);
    const userAssert2 = authService.getUserByUsername("test2");
    expect(userAssert2).toBeDefined();
    expect(userAssert2).toEqual(userAssert);
    expect(authService.verifyUser("test2", "password")).toBeTruthy();
  });
});
