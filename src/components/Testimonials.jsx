import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "./Testimonials.css";

const testimonials = [
    {
        name: "María González",
        role: "Madre de familia",
        text: "Gracias a la plataforma pudimos detectar señales tempranas en nuestro hijo. El proceso fue claro, humano y nos dio mucha tranquilidad.",
        avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
        name: "Dr. Luis Hernández",
        role: "Pediatra especialista",
        text: "Es una herramienta bien diseñada. Analiza conductas relevantes sin invadir la privacidad.",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        name: "Ana Sofía Romero",
        role: "Madre de familia",
        text: "La interfaz es muy sencilla y los reportes nos ayudaron a tomar decisiones informadas.",
        avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
        name: "Carlos Méndez",
        role: "Padre de familia",
        text: "El análisis fue claro y profesional. Nos permitió actuar con anticipación.",
        avatar: "https://i.pravatar.cc/150?img=15"
    },
    {
        name: "Dra. Paula Sánchez",
        role: "Neuropsicóloga",
        text: "Facilita la observación conductual temprana con enfoque respetuoso.",
        avatar: "https://i.pravatar.cc/150?img=20"
    }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const prev = () => {
        setDirection(-1);
        setIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const next = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    useEffect(() => {
        const interval = setInterval(next, 8000);
        return () => clearInterval(interval);
    }, []);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section className="testimonials-section" id="testimonials">
            <motion.h2
                className="testimonials-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Lo que dicen <span>familias y especialistas</span>
            </motion.h2>

            <div className="carousel-container">
                <button className="nav-btn prev" onClick={prev} aria-label="Anterior">
                    <HiChevronLeft />
                </button>

                <div className="carousel-wrapper">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 }
                            }}
                            className="testimonial-card"
                        >
                            <p className="testimonial-text">
                                “{testimonials[index].text}”
                            </p>

                            <div className="testimonial-user">
                                <img
                                    src={testimonials[index].avatar}
                                    alt={testimonials[index].name}
                                    loading="lazy"
                                />
                                <div className="user-info">
                                    <strong>
                                        {testimonials[index].name}
                                    </strong>
                                    <span>
                                        {testimonials[index].role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button className="nav-btn next" onClick={next} aria-label="Siguiente">
                    <HiChevronRight />
                </button>
            </div>

            <div className="dots">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        className={i === index ? "dot active" : "dot"}
                        onClick={() => {
                            setDirection(i > index ? 1 : -1);
                            setIndex(i);
                        }}
                        aria-label={`Ir al testimonio ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;