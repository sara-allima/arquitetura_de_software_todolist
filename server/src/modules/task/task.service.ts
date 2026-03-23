import type { CreateTaskInput, UpdateTaskInput } from "@kanban/types";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { NotFoundError } from "@/shared/error";

export const TaskService = {
	async create(data: CreateTaskInput) {
		const [task] = await db.insert(tasks).values(data).returning();

		return task;
	},

	async findAll() {
		return db.select().from(tasks);
	},

	async detail(id: number) {
		const [task] = await db.select().from(tasks).where(eq(tasks.id, id));

		if (!task) {
			throw new NotFoundError("Task");
		}

		return task;
	},

	async update(id: number, data: UpdateTaskInput) {
		const [task] = await db
			.update(tasks)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(tasks.id, id))
			.returning();

		if (!task) {
			throw new NotFoundError("Task");
		}

		return task;
	},

	async delete(id: number) {
		const [task] = await db.delete(tasks).where(eq(tasks.id, id)).returning();

		if (!task) {
			throw new NotFoundError("Task");
		}
	},
};
