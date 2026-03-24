import type { TaskDTO } from "@kanban/types";
import type { Task } from "@/db/schema";

export function toTaskDTO(task: Task): TaskDTO {
	return {
		id: task.id,
		title: task.title,
		description: task.description ?? null,
		status: task.status,
		createdAt: task.createdAt,
		updatedAt: task.updatedAt,
	};
}
