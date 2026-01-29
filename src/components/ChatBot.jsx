import { useState } from "react";
import "./ChatBot.css";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendMessage(text) {
        setLoading(true);

        const response = await fetch("https://davadev.app.n8n.cloud/webhook-test/autisense-chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text }),
        });

        const data = await response.json();

        setMessages(prev => [
            ...prev,
            { from: "user", text },
            { from: "bot", text: data.reply }
        ]);

        setLoading(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <div className="chatbot">
            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`msg ${msg.from}`}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div className="msg bot">Escribiendo…</div>}
            </div>

            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje…"
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
