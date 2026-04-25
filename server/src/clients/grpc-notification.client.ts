import path from "node:path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = path.resolve(__dirname, "../../notification/proto/notification.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const notificationClient = new grpcObject.NotificationService(
  "localhost:3001", // Tem que ajustar aqui essa porta vius
  grpc.credentials.createInsecure()
);

export { notificationClient };