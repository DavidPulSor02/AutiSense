import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hola 👋 Soy el asistente de AutiSense. Puedo ayudarte a conocer cómo funciona la plataforma, las señales tempranas del desarrollo infantil y nuestros planes."
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function sendMessage(text) {
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
                { from: "user", text },
                { from: "bot", text: data.reply || "Ocurrió un error 😥" }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { from: "bot", text: "Hubo un problema de conexión. Inténtalo de nuevo." }
            ]);
        }

        setLoading(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <>
            {/* BOTÓN FLOTANTE */}
            <button className="chat-toggle" onClick={() => setOpen(!open)}>
                💬
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
                        {loading && <div className="msg bot">Escribiendo…</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="chat-input">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Escribe tu mensaje…"
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading}>
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
