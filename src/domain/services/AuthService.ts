import { User } from "@/domain/entities/User";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { randomUUID } from "crypto";

/**
 * user service
 * @class
 * @public
 */
export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Get user by id
   */
  getUserByUsername(username: string): User | undefined {
    return this.userRepository.getUserByUsername(username);
  }

  /**
   * Creates a user with a randomUUID
   */
  createUser(user: User): void {
    // TODO: hash the password

    if (this.userRepository.getUserByUsername(user.username)) {
      throw new Error("User already exists");
    } else {
      this.userRepository.addUser(user);
    }
  }

  /**
   * log in a user
   */
  verifyUser(username: string, password: string): boolean {
    const user = this.userRepository.getUserByUsername(username);
    if (!user || user.password !== password) {
      return false;
    }
    return true;
  }

  updateUser(user: User): void {
    this.userRepository.updateUser(user);
  }

  deleteUser(id: string): void {
    this.userRepository.deleteUser(id);
  }
}
