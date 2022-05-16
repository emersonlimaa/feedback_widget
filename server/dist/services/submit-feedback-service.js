"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackService = void 0;
class SubmitFeedbackService {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type) {
            throw new Error('Type is requerid');
        }
        if (!comment) {
            throw new Error('Comment is requerid');
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalided screenshot format.');
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;"`,
                `<p>Tipo de Feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" >` : null,
                `</div>`
            ].join('\n')
        });
    }
}
exports.SubmitFeedbackService = SubmitFeedbackService;
