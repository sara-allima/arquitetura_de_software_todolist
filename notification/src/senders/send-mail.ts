import { transporter } from "../providers/mailer";

interface SendEmailParams {
	to: string;
	subject: string;
	html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
	await transporter.sendMail({
		from: "kanban@app.com",
		to,
		subject,
		html,
	});
}
