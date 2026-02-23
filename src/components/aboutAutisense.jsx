import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import "./aboutAutisense.css";

const FEATURES = [
    {
        title: "Reportes de Análisis",
        text: "Informes detallados y visuales del análisis de comportamiento, listos para exportar.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1769281682/Gemini_Generated_Image_awvy3awvy3awvy3a-removebg-preview2_dqpth5.png",
        color: "blue"
    },
    {
        title: "Evaluaciones Clínicas",
        text: "Documentación clínica rápida y precisa para profesionales de la salud.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1769280228/Gemini_Generated_Image_ymqprpymqprpymqp-removebg-preview_v2jz3z.png",
        color: "cyan"
    },
    {
        title: "Seguimiento del Desarrollo",
        text: "Monitorea el progreso y los hitos del bebé a lo largo del tiempo.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1769280228/Gemini_Generated_Image_knmfsyknmfsyknmf-removebg-preview_uwwwox.png",
        color: "blue"
    },
    {
        title: "Recursos para Padres",
        text: "Acceso a guías y materiales confiables para acompañar a las familias.",
        image: "https://res.cloudinary.com/dilgq19i2/image/upload/v1769280228/Gemini_Generated_Image_dg8ezsdg8ezsdg8e-removebg-preview_ulnttw.png",
        color: "cyan"
    }
];

const AboutAutisense = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, []);

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 5000); // Auto-play every 5s
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    return (
        <section className="features-auto-section">
            <div className="carousel-background-glow"></div>

            <div className="carousel-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Potenciamos el <span>Cuidado</span> con Inteligencia
                </motion.h2>
                <p>Nuestras herramientas de análisis clínico avanzan solas para ti.</p>
            </div>

            <div
                className="carousel-main-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="carousel-3d-track">
                    <AnimatePresence mode="wait">
                        <FeatureCard
                            key={activeIndex}
                            feature={FEATURES[activeIndex]}
                            index={activeIndex}
                        />
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="carousel-dots">
                    {FEATURES.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === activeIndex ? "active" : ""}`}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Ir a diapositiva ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Arrow Controls */}
                <button className="carousel-arrow prev" onClick={prevSlide}>‹</button>
                <button className="carousel-arrow next" onClick={nextSlide}>›</button>
            </div>
        </section>
    );
};

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            className={`feature-card-3d-auto ${feature.color}`}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30, x: 200 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 30, x: -200 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="card-glass-lighting"></div>

            <div className="image-wrapper">
                <motion.img
                    src={feature.image}
                    alt={feature.title}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="image-shadow"></div>
            </div>

            <div className="card-content">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>

                <div className="card-action">
                    <span className="dot-pulse"></span>
                    <span>Explorar herramienta</span>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutAutisense;
