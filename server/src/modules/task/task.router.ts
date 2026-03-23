import {
	createTaskSchema,
	taskParamsSchema,
	updateTaskSchema,
} from "@kanban/types";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { TaskController } from "@/modules/task/task.controller";

export const taskRoutes: FastifyPluginAsyncZod = async (app) => {
	app.post("/", {
		schema: {
			tags: ["Tasks"],
			summary: "Create a task",
			body: createTaskSchema,
		},
		handler: TaskController.create,
	});

	app.get("/", {
		schema: {
			tags: ["Tasks"],
			summary: "List all tasks",
		},
		handler: TaskController.findAll,
	});

	app.get("/:id", {
		schema: {
			tags: ["Tasks"],
			summary: "Detail a task",
		},
		handler: TaskController.detail,
	});

	app.put("/:id", {
		schema: {
			tags: ["Tasks"],
			summary: "Update a task",
			params: taskParamsSchema,
			body: updateTaskSchema,
		},
		handler: TaskController.update,
	});

	app.delete("/:id", {
		schema: {
			tags: ["Tasks"],
			summary: "Delete a task",
			params: taskParamsSchema,
		},
		handler: TaskController.delete,
	});
};
