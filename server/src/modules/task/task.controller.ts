import type {
	CreateTaskInput,
	TaskParams,
	UpdateTaskInput,
} from "@kanban/types";
import type { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "@/modules/task/task.service";

export const TaskController = {
	async create(
		req: FastifyRequest<{ Body: CreateTaskInput }>,
		reply: FastifyReply,
	) {
		const result = await TaskService.create(req.body);
		return reply.send(result);
	},

	async findAll(_req: FastifyRequest, reply: FastifyReply) {
		const result = await TaskService.findAll();
		return reply.send(result);
	},

	async detail(
		req: FastifyRequest<{ Params: TaskParams }>,
		reply: FastifyReply,
	) {
		const { id } = req.params;
		const result = await TaskService.detail(id);
		return reply.send(result);
	},

	async update(
		req: FastifyRequest<{ Params: TaskParams; Body: UpdateTaskInput }>,
		reply: FastifyReply,
	) {
		const { id } = req.params;
		const result = await TaskService.update(id, req.body);
		return reply.send(result);
	},

	async delete(
		req: FastifyRequest<{ Params: TaskParams }>,
		reply: FastifyReply,
	) {
		const { id } = req.params;
		await TaskService.delete(id);
		return reply.status(204).send();
	},
};
