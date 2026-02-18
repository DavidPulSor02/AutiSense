import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";
import ChatToggleIcon from "./ChatToggleIcon.jsx";

const FAQ_DATA = [
    // ... (rest of the component remains same, just replacing the button content)
    {
        question: "¿Qué es AutiSense?",
        answer: "AutiSense es una plataforma impulsada por IA diseñada para la detección temprana y seguimiento del desarrollo infantil, enfocada en el espectro autista."
    },
    {
        question: "Señales de alerta",
        answer: "Algunas señales tempranas incluyen: poco contacto visual, no responder a su nombre, retraso en el habla o movimientos repetitivos. ¡Nuestras herramientas pueden ayudarte a evaluarlas!"
    },
    {
        question: "Planes y precios",
        answer: "Contamos con un plan Lite (Gratis), Pro ($29/mes para familias) y Essential ($89 para profesionales). Puedes ver todos los detalles en la sección de Precios."
    },
    {
        question: "Privacidad",
        answer: "Tu privacidad es lo primero. Usamos encriptación de nivel bancario y cumplimos con normativas de protección de datos de salud."
    }
];

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hola 👋 Soy el asistente de AutiSense. Puedo ayudarte a conocer cómo funciona la plataforma, las señales tempranas y nuestros planes. ¿En qué puedo ayudarte hoy?"
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const simulateBotResponse = (text) => {
        setLoading(true);
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { from: "bot", text }
            ]);
            setLoading(false);
        }, 600);
    };

    async function sendMessage(text) {
        setMessages(prev => [...prev, { from: "user", text }]);

        // Check if it's an FAQ
        const faq = FAQ_DATA.find(f => f.question.toLowerCase() === text.toLowerCase());
        if (faq) {
            simulateBotResponse(faq.answer);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                "https://davadev.app.n8n.cloud/webhook-test/autisense-chat",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: text }),
                }
            );

            const data = await response.json();
            setMessages(prev => [
                ...prev,
                { from: "bot", text: data.reply || "Ocurrió un error 😥" }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { from: "bot", text: "Hubo un problema de conexión. Pero puedo responderte dudas generales si usas las opciones rápidas." }
            ]);
        }
        setLoading(false);
    }

    const handleFAQClick = (faq) => {
        sendMessage(faq.question);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <>
            {/* BOTÓN FLOTANTE */}
            <button className="chat-toggle" onClick={() => setOpen(!open)} aria-label="Abrir chat">
                <ChatToggleIcon isOpen={open} />
            </button>

            {/* CHAT */}
            {open && (
                <div className="chatbot">
                    <div className="chat-header">
                        <span>Asistente AutiSense</span>
                        <button onClick={() => setOpen(false)}>✕</button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`msg ${msg.from}`}>
                                {msg.text}
                            </div>
                        ))}

                        {!loading && messages.length === 1 && (
                            <div className="faq-chips">
                                {FAQ_DATA.map((faq, i) => (
                                    <button
                                        key={i}
                                        className="faq-chip"
                                        onClick={() => handleFAQClick(faq)}
                                    >
                                        {faq.question}
                                    </button>
                                ))}
                            </div>
                        )}

                        {loading && <div className="msg bot typing">Escribiendo<span>.</span><span>.</span><span>.</span></div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="chat-input">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Escribe tu mensaje…"
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !input.trim()}>
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
