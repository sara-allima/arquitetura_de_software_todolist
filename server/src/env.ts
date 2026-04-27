import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	DB_FILE_NAME: z.string().min(1),
	CUSTOMER_EMAIL: z.email(), // Para não precisar ficar exportando o arquivo ".env"
});

export const env = envSchema.parse(process.env);
