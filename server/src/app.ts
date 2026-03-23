import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import type { FastifyError } from "fastify";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { taskRoutes } from "@/modules/task/task.router";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "To-do list with kanban API",
			description: "List, board and manager tasks",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, { routePrefix: "/docs" });

app.register(taskRoutes, { prefix: "/tasks" });

app.setErrorHandler((error: FastifyError, _req, reply) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.message ?? "Internal Server Error";

	return reply.status(statusCode).send({ message });
});
