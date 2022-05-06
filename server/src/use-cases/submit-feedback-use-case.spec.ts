import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  
  it('should be able to submit a feedback', () => {
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'test comment',
      screenshot: 'data:image/png;base64,uidh8923d9384hdoidjijwe90d23j0test.jpg'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    //expect(sendMailSpy).toHaveBeenCalled();
    
  });

  it('should not be able to submit a feedback without type', () => {
    expect(submitFeedback.execute({
      type: '',
      comment: 'test comment',
      screenshot: 'data:image/png;base64,uidh8923d9384hdoidjijwe90d23j0test.jpg'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', () => {
    expect(submitFeedback.execute({
      type: 'IDEA',
      comment: '',
      screenshot: 'data:image/png;base64,uidh8923d9384hdoidjijwe90d23j0test.jpg'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', () => {
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'test comment',
      screenshot: 'INVALID-image-uidh8923d9384hdoidjijwe90d23j0test.jpg'
    })).rejects.toThrow();
  });
});