import "dotenv/config";

export const env = {
  SMTP_HOST: process.env.SMTP_HOST || "localhost",
  SMTP_PORT: Number(process.env.SMTP_PORT || 1025),
  PORT: Number(process.env.PORT || 50051),
};