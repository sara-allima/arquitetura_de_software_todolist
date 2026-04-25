import type { CreateTaskInput, UpdateTaskInput } from "@kanban/types";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { toTaskDTO } from "@/modules/task/task.mapper";
import { NotFoundError } from "@/shared/error";
import { EMAIL_SUBJECTS, EMAIL_CONTENT } from "@kanban/types";
import { notificationClient } from "@/clients/grpc-notification.client";
import { any, email } from "zod";
import { env } from "@/env";
import { title } from "node:process";


export const TaskService = {
	async create(data: CreateTaskInput) {
		const [task] = await db.insert(tasks).values(data).returning();

		notificationClient.sendNotification(
			{
				email: env.CUSTOMER_EMAIL,
				title: EMAIL_SUBJECTS.TASK_CREATED_SUBJECT,
				message: EMAIL_CONTENT.TASK_CREATED_CONTENT
			},
			(err: any) => {
				if(err) console.error("Erro ao enviar notificação", err);
			}
		);

		return toTaskDTO(task);
	},

	async findAll() {
		const taskList = await db.select().from(tasks);
		return taskList.map(toTaskDTO);
	},

	async detail(id: number) {
		const [task] = await db.select().from(tasks).where(eq(tasks.id, id));

		if (!task) {
			throw new NotFoundError("Task");
		}

		return toTaskDTO(task);
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

		notificationClient.sendNotification(
			{
				email: env.CUSTOMER_EMAIL,
				title: EMAIL_SUBJECTS.TASK_UPDATED_SUBJECT,
				message: EMAIL_CONTENT.TASK_UPDATED_CONTENT
			},
			(err: any) => {
				if(err) console.error("Erro ao enviar notificação", err);
			}
		)

		return toTaskDTO(task);
	},

	async delete(id: number) {
		const [task] = await db.delete(tasks).where(eq(tasks.id, id)).returning();

		if (!task) {
			throw new NotFoundError("Task");
		}

		notificationClient.sendNotification(
			{
				email: env.CUSTOMER_EMAIL,
				title: EMAIL_SUBJECTS.TASK_DELETED_SUBJECT,
				message: EMAIL_CONTENT.TASK_DELETED_CONTENT
			}
		)
	},
};
