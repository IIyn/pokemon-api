import { beforeAll, afterAll } from "@jest/globals";
import { sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db, pool } from "../src/infrastructure/data";

import { users } from "../src/infrastructure/data/schema";

export let createdUser: { id: string; username: string; password: string } = {
  id: "",
  username: "",
  password: "",
};

beforeAll(async () => {
  try {
    console.log("Setup test environment...");

    await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);

    console.log("Schema created successfully");

    await db.execute(sql`SET search_path TO test`);

    console.log("Search path set successfully");

    await migrate(db, {
      migrationsFolder: "src/infrastructure/data/drizzle",
      migrationsSchema: "test",
    });
    console.log("Migration done! GG");

    const hashedPassword = await bcrypt.hash("password123", 10);
    const result = await db
      .insert(users)
      .values({ username: "Conan", password: hashedPassword })
      .returning()
      .execute();

    createdUser = {
      id: result[0].id,
      username: "Conan",
      password: hashedPassword,
    };
    console.log("Test user created successfully");
    console.table(createdUser);
  } catch (error) {
    console.error("Error during beforeAll in setup:");
    console.error(error);
  }
});

afterAll(async () => {
  try {
    // await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
    await pool.end();
  } catch (error) {
    console.error("Error during afterAll:", error);
  }
});
