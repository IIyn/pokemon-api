import { User } from "@/domain/entities/User";
import fs from "fs";
import path from "path";

/**
 * Handling users
 * @class
 * @public
 */
export class UserRepository {
  private users: User[] = [];

  private readonly filePath = path.join(__dirname, "..", "data", "users.json"); // readonly we only need to set it once

  constructor() {
    this.users = this.loadUsers();
  }

  /**
   * Load users from the json file
   * @returns {User[]} - The list of users
   */
  loadUsers(): User[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  /**
   * Save users to the json file
   */
  saveUsers(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2));
  }

  /**
   * Get a user by its id
   * @param id - The id of the user
   * @returns User | undefined - The user with the given id
   */
  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Get all users
   * @returns {User[]} - All users
   */
  getAllUsers(): User[] {
    return this.users;
  }

  /**
   * Get a user by its username
   * @param username - The username of the user
   */
  getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  /**
   * Add a new user
   * @param user - The user to add
   */
  addUser(user: User): void {
    this.users.push(user);
    this.saveUsers();
  }

  /**
   * Update a user
   * @param user - The user to update
   */
  updateUser(user: User): void {
    this.users = this.users.map((u) => (u.id === user.id ? user : u));
    this.saveUsers();
  }

  /**
   * Delete a user
   * @param id - The id of the user to delete
   */
  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
    this.saveUsers();
  }
}
