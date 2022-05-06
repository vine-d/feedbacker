import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

describe('Submit feedback', () => {
  it('should be able to submit a feedback', () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async() => {} },
      { sendMail: async() => {} }
    )

    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'test comment',
      screenshot: 'test.jpg'
    })).resolves.not.toThrow()
  })
})