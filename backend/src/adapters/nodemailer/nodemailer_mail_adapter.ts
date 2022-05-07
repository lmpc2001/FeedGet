import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail_adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ee83922259eee4",
        pass: "78cbe8dbef828c"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipa Feedget <develop@feedget.com',
            to: 'Luís Costa <email@testes.com>',
            subject,
            html: body
        })
    }
}