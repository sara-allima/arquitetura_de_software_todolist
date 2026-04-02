import { z } from "zod";

export const TASK_STATUS = ["todo", "doing", "done"] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];

export const createTaskSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	status: z.enum(TASK_STATUS).default(TASK_STATUS[0]),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskParamsSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export type TaskParams = z.infer<typeof taskParamsSchema>;

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export type TaskDTO = {
	id: number;
	title: string;
	description: string | null;
	status: TaskStatus;
	createdAt: Date;
	updatedAt: Date;
};

export type TasksByColumn = Record<TaskStatus, TaskDTO[]>;
