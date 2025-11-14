import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const app = new Hono().post(
	"/",
	zValidator(
		"json",
		z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(3).max(20),
		})
	),
	async (c) => {
		const { name, email, password } = c.req.valid("json");
		const hashedPassword = await bcrypt.hash(password, 12);

		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, email));
		if (existingUser[0]) {
			return c.json({ error: "User already exists" }, 400);
		}

		await db.insert(users).values({ name, email, password: hashedPassword });

		return c.json(null, 200);
	}
);

export default app;
