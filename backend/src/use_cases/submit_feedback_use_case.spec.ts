import { SubmitFeedbackUseCase } from "./submit_feedback_use_case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async() => {
        await expect(submitFeedback.handle({
            type: 'BUG',
            comment: 'Comment Example',
            screenshot: 'data:image/png;base64,812fkgkhegjrtkjhnsuusfn'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.handle({
            type: '',
            comment: 'Comment Example',
            screenshot: 'data:image/png;base64,812fkgkhegjrtkjhnsuusfn'
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedback.handle({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,812fkgkhegjrtkjhnsuusfn'
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.handle({
            type: 'BUG',
            comment: 'Comment Example',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    })
})