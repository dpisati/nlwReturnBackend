import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '46f75aa679ce2e',
        pass: '8bb6bf679a568c',
    },
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ body, subject }: SendMailData) {
        await transport.sendMail({
            from: 'Team Feedget <hi@feedget.com>',
            to: 'Daniel Pisati <dpistspam@gmail.com>',
            subject,
            html: body,
        });
    }
}
