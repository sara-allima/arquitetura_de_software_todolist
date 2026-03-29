import type { CreateTaskInput, TaskDTO } from "@kanban/types";
import { api } from "@/services/api";

export async function getTasks(): Promise<TaskDTO[]> {
	const response = await api.get("/tasks");
	return response.data;
}

export async function createTask(data: CreateTaskInput): Promise<TaskDTO> {
	const response = await api.post("/tasks", data);
	return response.data;
}
