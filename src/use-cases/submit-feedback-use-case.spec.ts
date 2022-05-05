import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(
            submitFeedback.execute({
                type: 'bug',
                comment: 'I have a bug',
                screenshot: 'data:image/png;base64:test.jpg',
            })
        ).resolves.not.toThrow();

        expect(sendEmailSpy).toHaveBeenCalled();
        expect(createFeedbackSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without a type', async () => {
        await expect(
            submitFeedback.execute({
                type: '',
                comment: 'I have a bug',
                screenshot: 'data:image/png;base64:test.jpg',
            })
        ).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', async () => {
        await expect(
            submitFeedback.execute({
                type: 'BUG',
                comment: '',
                screenshot: 'data:image/png;base64:test.jpg',
            })
        ).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(
            submitFeedback.execute({
                type: 'BUG',
                comment: 'Test',
                screenshot: 'test.jpg',
            })
        ).rejects.toThrow();
    });
});
