import { MailAdapter } from "../adapters/mail_adapter";
import { FeedbacksRepository } from "../repositories/feedback_repository";
import { PrismaFeedbackRepository } from "../repositories/prisma/prisma_feedback_repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter) { }

    async handle(request: SubmitFeedbackUseCaseRequest) {
        const { comment, type, screenshot } = request

        if (!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        }


        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family:sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de Feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                '<div>'
            ].join('\n')
        })
    }
}