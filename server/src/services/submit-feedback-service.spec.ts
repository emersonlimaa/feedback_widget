import { SubmitFeedbackService } from './submit-feedback-service';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy}
)

describe('Submit Feedback', () => {
 it('should be able to submit a feedback', async () => {

   await expect(submitFeedback.execute({
     type: 'BUG',
     comment: 'example comment',
     screenshot: 'data:image/png;base64seincieutnvuipqeyh',
   })).resolves.not.toThrow();
   expect(createFeedbackSpy).toHaveBeenCalled();
   expect(sendMailSpy).toHaveBeenCalled();
 });


 it('should not be able to submit without type', async () => {

  await expect(submitFeedback.execute({
    type: '',
    comment: 'example comment',
    screenshot: 'data:image/png;base64seincieutnvuipqeyh',
  })).rejects.not.toThrow();
});

it('should not be able to submit without comment', async () => {

  await expect(submitFeedback.execute({
    type: 'BUG',
    comment: '',
    screenshot: 'data:image/png;base64seincieutnvuipqeyh',
  })).rejects.not.toThrow();
});

it('should not be able to submit without screenshot', async () => {

  await expect(submitFeedback.execute({
    type: 'BUG',
    comment: 'example comment',
    screenshot: '123123.jpg',
  })).rejects.not.toThrow();
});
});