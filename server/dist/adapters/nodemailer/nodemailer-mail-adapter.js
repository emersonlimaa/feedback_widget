"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodemailerMailAdapter {
    async sendMail({ subject, body }) {
        const transport = nodemailer_1.default.createTransport({
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
        });
    }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
