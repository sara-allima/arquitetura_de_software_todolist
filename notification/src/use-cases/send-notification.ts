import { sendEmail } from "../senders/send-mail";

export const sendNotification = {
	execute: async (call: any, callback: any) => {
		try {
			const { email, title, message } = call.request;

			await sendEmail({
				to: email,
				subject: title,
				html: `<p>${message}</p>`,
			});

			callback(null, { success: true });
		} catch (error) {
			console.error(error);
			callback(error);
		}
	},
};
