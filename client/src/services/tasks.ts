import type {
	CreateTaskInput,
	TaskDTO,
	TaskStatus,
	TasksByColumn,
	UpdateTaskInput,
} from "@kanban/types";
import { api } from "./api";

export async function getTasks(): Promise<TasksByColumn> {
	const response = await api.get("/tasks");
	return groupByStatus(response.data);
}

export async function createTask(data: CreateTaskInput): Promise<TaskDTO> {
	const response = await api.post("/tasks", data);
	return response.data;
}

export async function updateTask(
	id: number,
	data: UpdateTaskInput,
): Promise<TaskDTO> {
	const response = await api.put(`/tasks/${id}`, data);
	return response.data;
}

export async function deleteTask(id: number): Promise<void> {
	await api.delete(`/tasks/${id}`);
}

export function groupByStatus(tasks: TaskDTO[]): TasksByColumn {
	return tasks.reduce<TasksByColumn>(
		(acc, task) => {
			const col = task.status as TaskStatus;
			if (acc[col]) acc[col].push(task);
			return acc;
		},
		{ todo: [], doing: [], done: [] },
	);
}
