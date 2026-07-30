import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./FAQ.css";

const FAQ_DATA = [
    {
        question: "¿Qué es AutiSense y cómo funciona?",
        answer: "AutiSense es una plataforma que utiliza inteligencia artificial para analizar patrones de comportamiento en videos cortos de niños. Nuestro sistema identifica señales tempranas asociadas al TEA y proporciona un informe detallado para padres y especialistas."
    },
    {
        question: "¿Es seguro subir videos de mi hijo?",
        answer: "Absolutamente. La privacidad es nuestra prioridad número uno. Todos los videos se cifran de extremo a extremo, se analizan sin extraer datos biométricos de identidad, y se almacenan en servidores que cumplen con las normativas HIPAA y GDPR."
    },
    {
        question: "¿AutiSense da un diagnóstico oficial?",
        answer: "No. AutiSense es una herramienta de cribado (screening) y apoyo a la detección temprana. Los resultados generados deben ser compartidos y evaluados por un médico o especialista certificado para un diagnóstico formal."
    },
    {
        question: "¿Desde qué edad se puede utilizar la plataforma?",
        answer: "Nuestra tecnología está optimizada para analizar comportamientos e hitos del desarrollo en niños desde los 18 meses hasta los 5 años de edad."
    },
    {
        question: "¿Puedo compartir los resultados con mi pediatra?",
        answer: "Sí, todos los reportes generados por la plataforma se pueden exportar fácilmente en formato PDF o enviar de forma segura a tu especialista médico directamente desde la aplicación."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">
                <motion.div
                    className="faq-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Preguntas <span>Frecuentes</span></h2>
                    <p>Resolvemos tus dudas sobre el funcionamiento y seguridad de nuestra plataforma.</p>
                </motion.div>

                <div className="faq-list">
                    {FAQ_DATA.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                className={`faq-item ${isOpen ? "open" : ""}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <span>{faq.question}</span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="faq-icon"
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="faq-answer-container"
                                        >
                                            <div className="faq-answer">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
