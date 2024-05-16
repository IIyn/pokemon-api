import { User, NewUser, UserColumns } from "@/domain/entities/User";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import env from "@/config/env";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { REFRESH_SECRET, JWT_SECRET } = env;

/**
 * user service
 * @class
 * @public
 */
export class AuthService {
  private userRepository: UserRepository;
  public static REFRESH_TOKEN_STORE: Map<string, string> = new Map();

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Get user by id
   * @param username - the id of the user
   * @returns the user
   */
  getUserByUsername(username: string): Promise<Partial<User> | undefined> {
    const columns: UserColumns = {
      id: true,
      username: true,
      refreshToken: true,
    };
    return this.userRepository.getUserByUsername(username, columns);
  }

  /**
   * Creates a user with a randomUUID
   * @param user - the user to create
   */
  createUser(user: NewUser): void {
    this.userRepository.addUser(user);
  }

  /**
   * verify if the user exists and the password is correct
   * @param username - the username of the user
   * @param hashedPassword - the hashed password of the user
   * @returns true if the user exists and the password is correct, false otherwise
   */
  async verifyUser(username: string, hashedPassword: string): Promise<boolean> {
    const user = (await this.userRepository.getUserByUsername(username, {
      password: true,
    })) as any;
    if (!user) {
      return false;
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        hashedPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return false;
      }
    }
    return true;
  }

  /**
   * update a user
   * @param user
   */
  updateUser(user: User): void {
    this.userRepository.updateUser(user);
  }

  /**
   * delete a user
   * @param id - the id of the user
   */
  deleteUser(id: string): void {
    this.userRepository.deleteUser(id);
  }

  /**
   * issue an access token
   * @param id - the id of the user
   * @returns the access token
   */
  issueAccessToken(id: string): string {
    return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "2m" });
  }

  /**
   * issue a refresh token
   * @param id - the id of the user
   * @returns the refresh token
   */
  issueRefreshToken(id: string): string {
    const refresh = jwt.sign({ userId: id }, REFRESH_SECRET, {
      expiresIn: "3h",
    });

    AuthService.REFRESH_TOKEN_STORE.set(id, refresh);

    return refresh;
  }

  /**
   * refresh the access token: if the refresh token is valid and not expired, issue a new access token and also refresh the refresh token
   * @param accessToken - the access token
   * @returns the new access token or null if the refresh token is invalid
   */
  refreshAccessToken(accessToken: string): string | null {
    try {
      const payload = jwt.decode(accessToken) as jwt.JwtPayload;
      const storedRefreshToken = AuthService.REFRESH_TOKEN_STORE.get(
        payload.userId
      );

      if (!storedRefreshToken) {
        throw new Error("Invalid refresh token");
      }

      jwt.verify(storedRefreshToken, REFRESH_SECRET);
      const decode = jwt.decode(storedRefreshToken) as jwt.JwtPayload;

      const isExpired = Date.now() >= decode?.exp! * 1000;

      if (!isExpired) {
        this.issueRefreshToken(payload.userId);
      }
      return this.issueAccessToken(payload.userId);
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  }
}
