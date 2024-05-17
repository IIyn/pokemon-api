import { User, NewUser, UserColumns } from "@/domain/entities/User";
import { db } from "@/infrastructure/data";
import { eq } from "drizzle-orm";
import { users } from "@/infrastructure/data/schema";

/**
 * Handling users
 * @class
 * @public
 */
export class UserRepository {
  /**
   * Get a user by its id
   * @param id - The id of the user
   * @param columns - The columns to select
   * @returns Promise<Partial<User | undefined>> - The user or undefined if not found
   */
  getUserById(
    id: string,
    columns: UserColumns
  ): Promise<Partial<User | undefined>> {
    try {
      return db.query.users.findFirst({
        where: eq(users.id, id),
        columns,
      });
      // SELECT id, username FROM users WHERE id = $1
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  }

  /**
   * Get all users
   * @returns {User[]} - All users
   */
  getAllUsers(): Promise<Partial<User>[]> {
    try {
      return db.query.users.findMany({
        columns: {
          id: true,
          username: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  }

  /**
   * Get a user by its username
   * @param username - The username of the user
   * @param columns - The columns to select
   * @returns Promise<Partial<User | undefined>> - The user or undefined if not found
   */
  getUserByUsername(
    username: string,
    columns: UserColumns
  ): Promise<Partial<User | undefined>> {
    try {
      return db.query.users.findFirst({
        where: eq(users.username, username),
        columns,
      });
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  }

  /**
   * Add a new user
   * @param user - The user to add
   */
  addUser(user: NewUser) {
    try {
      return db.insert(users).values(user).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer l'utilisateur");
    }
  }

  /**
   * Update a user
   * @param user - The user to update
   */
  updateUser(user: User) {
    try {
      return db.update(users).set(user).where(eq(users.id, user.id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  }

  /**
   * Delete a user
   * @param id - The id of the user to delete
   */
  deleteUser(id: string): void {
    try {
      db.delete(users).where(eq(users.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer l'utilisateur");
    }
  }
}
