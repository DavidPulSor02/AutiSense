import { motion } from "framer-motion";
import { useState } from "react";
import "./WhyChooseUs.css";

const items = [
    {
        id: 1,
        title: "Detección temprana y precisa",
        description:
            "Nuestra IA identifica patrones sutiles de comportamiento y motricidad que suelen pasar desapercibidos a edades muy tempranas, permitiendo actuar cuanto antes.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1767392624/Deteccion_r6eswp.png"
    },
    {
        id: 2,
        title: "Seguridad y privacidad como prioridad",
        description:
            "Todos los videos y datos de los pacientes están cifrados y se almacenan bajo estrictos estándares de protección de información médica.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1767392576/seguridad_xg8wnu.png"
    },
    {
        id: 3,
        title: "Diseñado para doctores y familias",
        description:
            "Una interfaz simple e intuitiva permite que médicos y padres suban videos, revisen resultados y den seguimiento al progreso de forma clara y accesible.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1767392683/Disenodocyfamilia_ugl65g.png"
    },
    {
        id: 4,
        title: "Basado en evidencia y guiado por especialistas",
        description:
            "La plataforma fue desarrollada junto con pediatras y se fundamenta en guías clínicas validadas para ofrecer resultados confiables y útiles.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1767392528/doc_jihrm1.png"
    }
];

const WhyChooseUs = () => {
    const [activeId, setActiveId] = useState(1);

    return (
        <section className="why-section">
            <h2 className="why-title">
                ¿Por qué <span>elegirnos</span>?
            </h2>

            <div className="why-row">
                {items.map((item) => {
                    const isActive = item.id === activeId;

                    return (
                        <motion.div
                            key={item.id}
                            className={`why-card ${isActive ? "active" : ""}`}
                            onMouseEnter={() => setActiveId(item.id)}
                            animate={{
                                flex: isActive ? 1.4 : 1,
                                opacity: isActive ? 1 : 0.6
                            }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            <motion.img
                                src={item.image}
                                alt={item.title}
                                className="why-image"
                                animate={{
                                    scale: isActive ? 1 : 0.9,
                                    filter: isActive
                                        ? "grayscale(0%)"
                                        : "grayscale(100%)"
                                }}
                                transition={{ duration: 0.45 }}
                            />

                            <div className="why-content">
                                <h3>{item.title}</h3>

                                {isActive && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        {item.description}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyChooseUs;
