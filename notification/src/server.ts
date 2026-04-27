import path from "node:path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { env } from "./env";
import { transporter } from "./providers/mailer";
import { sendNotification } from "./use-cases/send-notification";

const PROTO_PATH = path.resolve(__dirname, "../proto/notification.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const notificationPackage = grpcObject;

export function startGrpcServer() {
	const server = new grpc.Server();

	server.addService(notificationPackage.NotificationService.service, {
		sendNotification,
	});

	server.bindAsync(
		`0.0.0.0:${env.PORT}`,
		grpc.ServerCredentials.createInsecure(),
		async () => {
			console.log(
				`🚀 gRPC server running on port ${env.PORT}, mailhog interface running on port 8025`,
			);

			await transporter.sendMail({
				from: "test@kanban.com",
				to: "user@email.com",
				subject: "Teste MailHog",
				html: "<h1>Funcionando 🚀</h1>",
			});
		},
	);
}
