require("dotenv").config();
import type { Config } from 'drizzle-kit';

export default {
	schema: './app/db/schema.ts',
	out: './app/db/migrations',
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.SQLITE_CONNECTION,
	},
} satisfies Config;

// export default {
//   schema: "./db/schema.ts",
//   out: "./migrations",
//   dialect: "sqlite",
//   driver: "turso",
//   dbCredentials: {
//     url: process.env.TURSO_CONNECTION_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN,
//   },
// } satisfies Config;