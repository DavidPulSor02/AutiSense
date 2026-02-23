import express from "express";
import Conversation from "../models/Conversation.js";

const router = express.Router();

const FAQ_DATA = [
    {
        question: "¿Qué es AutiSense?",
        answer: "AutiSense es una plataforma impulsada por IA diseñada para la detección temprana."
    },
    {
        question: "Señales de alerta",
        answer: "Algunas señales incluyen poco contacto visual o retraso en el habla."
    },
    {
        question: "Planes y precios",
        answer: "Plan Lite Gratis, Pro $29, Essential $89."
    },
    {
        question: "Privacidad",
        answer: "Usamos encriptación y protección de datos."
    }
];

router.post("/", async (req, res) => {
    try {
        const { message, userId } = req.body;

        let conversation = await Conversation.findOne({ userId });

        if (!conversation) {
            conversation = await Conversation.create({
                userId,
                messages: []
            });
        }

        conversation.messages.push({
            sender: "user",
            text: message
        });

        const faq = FAQ_DATA.find(f =>
            message.toLowerCase().includes(f.question.toLowerCase())
        );

        const botReply = faq
            ? faq.answer
            : "Gracias por tu mensaje. Pronto te ayudaremos.";

        conversation.messages.push({
            sender: "bot",
            text: botReply
        });

        await conversation.save();

        res.json({ reply: botReply });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en servidor" });
    }
});

export default router;