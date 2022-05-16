import { FeedbacksRepository } from '../repositories/feedbacks-repository';
import { MailAdapter } from '../adapters/mail-adapter';

interface SubmitFeedbackServiceRequest{
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackService {

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackServiceRequest){
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is requerid')
    }

    if(!comment) {
      throw new Error('Comment is requerid')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalided screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body:[
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;"`,
        `<p>Tipo de Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" >` : null,
        `</div>`
      ].join('\n')
    })
  }
}