import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { insertProjectSchema, projects } from "@/db/schema";
import { db } from "@/db/drizzle";

const app = new Hono().post(
	"/",
	verifyAuth(),
	zValidator(
		`json`,
		insertProjectSchema.pick({
			name: true,
			json: true,
			height: true,
			width: true,
		})
	),
	async (c) => {
		const auth = c.get("authUser");
		const { name, json, height, width } = c.req.valid("json");
		if (!auth.token?.id) {
			return c.json({ error: "Unauthorized" }, 401);
		}
		const data = await db
			.insert(projects)
			.values({
				name,
				json,
				height,
				width,
				userId: auth.token.id,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();
		if (!data[0]) {
			return c.json({ error: "Something went wrong" }, 400);
		}
		return c.json({ data: data[0] }, 200);
	}
);

export default app;
