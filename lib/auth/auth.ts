import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
    database: new Database("sqlite.db"),
    baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000/~cnchor4",
    emailAndPassword: {
        enabled: true,
    },
});