import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "node:path";
import { sendNotification } from "./use-cases/send-notification";
import { env } from "./env";
import { transporter } from "./providers/mailer";

const PROTO_PATH = path.resolve(__dirname, "../proto/notification.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const notificationPackage = grpcObject;

export function startGrpcServer() {
  const server = new grpc.Server();

  server.addService(
    notificationPackage.NotificationService.service,
    sendNotification
  );

  server.bindAsync(
    `0.0.0.0:${env.PORT}`,
    grpc.ServerCredentials.createInsecure(),
    async () => {
      console.log(`🚀 gRPC server running on port ${env.PORT}`);

    await transporter.sendMail({
        from: "test@kanban.com",
        to: "user@email.com",
        subject: "Teste MailHog",
        html: "<h1>Funcionando 🚀</h1>",
    });
    }
  );
}