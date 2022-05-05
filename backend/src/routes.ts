import { NextFunction, Request, Response, Router } from "express";
import nodemailer from 'nodemailer';
import { prisma } from "./prisma";

const router = Router();

router.post('/feedbacks', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, type, screenshot } = req.body

        const feedback = await prisma.feedback.create({
            data: {
                comment,
                type,
                screenshot
            }
        })

        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ee83922259eee4",
                pass: "78cbe8dbef828c"
            }
        });

        await transport.sendMail({
            from: 'Equipa Feedget <develop@feedget.com',
            to: 'Luís Costa <email@testes.com>',
            subject: 'Novo Feedback',
            html: [
                `<div style="font-family:sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de Feedback: ${type}</p>`,
                `<p>TComentário: ${comment}</p>`,
                '<div>'
            ].join('\n')
        })

        return res.status(201).json({ data: feedback })
    } catch (error) {
        next(error);
    }
});

export default router;