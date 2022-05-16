import { MailAdapter, SendMaildata } from '../mail-adapter';
import nodemailer from 'nodemailer';

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMaildata) {
    
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0736b8c770a6c2",
        pass: "efb0ff32767d49"
      }
    });

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Emerson Lima <emerson00lima00@gmail.com>',
      subject,
      html: body,
    })
  }
}