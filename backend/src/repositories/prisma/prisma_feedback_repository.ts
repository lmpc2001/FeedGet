import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedback_repository";

export class PrismaFeedbackRepository implements FeedbacksRepository {

    async create({type, comment, screenshot}: FeedbackCreateData) {
        const feedback = await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        })
    };
}