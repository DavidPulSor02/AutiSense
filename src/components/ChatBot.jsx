import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";
import ChatToggleIcon from "./ChatToggleIcon.jsx";

const FAQ_DATA = [
    {
        question: "¿Qué es AutiSense?",
        answer:
            "AutiSense es una plataforma impulsada por IA diseñada para la detección temprana y seguimiento del desarrollo infantil."
    },
    {
        question: "Señales de alerta",
        answer:
            "Algunas señales incluyen poco contacto visual, no responder a su nombre o retraso en el habla."
    },
    {
        question: "Planes y precios",
        answer:
            "Contamos con plan Lite (Gratis), Pro ($29/mes) y Essential ($89 para profesionales)."
    },
    {
        question: "Privacidad",
        answer:
            "Tu información está protegida con encriptación de nivel bancario."
    }
];

const API_URL = import.meta.env.VITE_API_URL || "";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

    const messagesEndRef = useRef(null);

    // Fetch history when opening the chat
    useEffect(() => {
        if (open && isAuth) {
            fetchChatHistory();
        } else if (open && !isAuth) {
            setMessages([
                {
                    from: "bot",
                    text: "Hola 👋 Soy el asistente de AutiSense. Por favor, inicia sesión para que pueda guardar tu progreso y ayudarte mejor."
                }
            ]);
        }
    }, [open, isAuth]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Check for auth status periodically or on interaction
    useEffect(() => {
        const checkAuth = () => {
            setIsAuth(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", checkAuth);
        // También checar al enfocar la ventana por si hubo cambios en otras pestañas
        window.addEventListener("focus", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("focus", checkAuth);
        };
    }, []);

    const fetchChatHistory = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/chat`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success && data.messages) {
                const formattedMessages = data.messages.map(msg => ({
                    from: msg.role === "bot" ? "bot" : "user",
                    text: msg.content
                }));
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const sendMessageToAPI = async (text) => {
        if (!isAuth) {
            setMessages((prev) => [...prev, { from: "user", text }]);
            setTimeout(() => {
                setMessages((prev) => [...prev, { from: "bot", text: "Recuerda iniciar sesión para recibir ayuda personalizada de nuestros especialistas." }]);
            }, 600);
            return;
        }

        setMessages((prev) => [...prev, { from: "user", text }]);
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();
            if (data.success && data.botMessage) {
                setMessages((prev) => [...prev, {
                    from: data.botMessage.role === "bot" ? "bot" : "user",
                    text: data.botMessage.content
                }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [...prev, {
                from: "bot",
                text: "Lo siento, tuve un problema al procesar tu mensaje. Inténtalo de nuevo más tarde."
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        sendMessageToAPI(input);
        setInput("");
    };

    const clearChat = async () => {
        if (!isAuth) return;
        if (!window.confirm("¿Estás seguro de que deseas borrar el historial?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/chat`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setMessages([{
                    from: data.initialMessage.role === "bot" ? "bot" : "user",
                    text: data.initialMessage.content
                }]);
            }
        } catch (error) {
            console.error("Error clearing chat:", error);
        }
    };

    return (
        <>
            <button
                className="chat-toggle"
                onClick={() => setOpen(!open)}
                aria-label="Abrir chat"
            >
                <ChatToggleIcon isOpen={open} />
            </button>

            {open && (
                <div className="chatbot">
                    <div className="chat-header">
                        <div>
                            <h4>Asistente AutiSense</h4>
                            <span>En línea</span>
                        </div>
                        <div className="header-actions">
                            {isAuth && messages.length > 1 && (
                                <button className="clear-chat" onClick={clearChat} title="Borrar historial">🗑️</button>
                            )}
                            <button onClick={() => setOpen(false)}>✕</button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`msg ${msg.from}`}>
                                {msg.text}
                            </div>
                        ))}

                        {!loading && messages.length <= 1 && (
                            <div className="faq-chips">
                                {FAQ_DATA.map((faq, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessageToAPI(faq.question)}
                                    >
                                        {faq.question}
                                    </button>
                                ))}
                            </div>
                        )}

                        {loading && (
                            <div className="msg bot typing">
                                Escribiendo...
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="chat-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            disabled={loading}
                        />
                        <button type="submit" disabled={!input.trim()}>
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}