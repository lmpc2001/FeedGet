import { NextFunction, Request, Response, Router } from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer_mail_adapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma_feedback_repository";
import { SubmitFeedbackUseCase } from "./use_cases/submit_feedback_use_case";

const router = Router();



router.post('/feedbacks', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, type, screenshot } = req.body;

        const prismaFeedbackRepository = new PrismaFeedbackRepository();
        const nodemailerMailAdapter = new NodemailerMailAdapter();

        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter);

        await submitFeedbackUseCase.handle({
            type,
            comment,
            screenshot
        })


        
        return res.status(201).send();
    } catch (error) {
        next(error);
    }
});

export default router;