import "./Hero.css";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
    // State for video modal
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Parallax mouse effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [8, -8]);
    const rotateY = useTransform(x, [-50, 50], [-8, 8]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const offsetX = e.clientX - innerWidth / 2;
            const offsetY = e.clientY - innerHeight / 2;

            x.set(offsetX / 20);
            y.set(offsetY / 20);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isVideoOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isVideoOpen]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="hero" className="hero">
            {/* Background Elements */}
            <div className="hero-bg-glow"></div>

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="badge-container" variants={itemVariants}>
                    <span className="badge-new">Nuevo 🚀</span>
                    <span className="badge-text">AutiSense 2.0 ya está aquí</span>
                </motion.div>

                <motion.h1 variants={itemVariants}>
                    Descubre el Potencial <br />
                    <span className="text-gradient">Sin Límites</span> de tu Hijo
                </motion.h1>

                <motion.p variants={itemVariants}>
                    La plataforma #1 impulsada por IA para la detección temprana y acompañamiento del TEA.
                    Tecnología que entiende, apoya y conecta.
                </motion.p>

                <motion.div className="hero-actions" variants={itemVariants}>
                    <button className="btn-primary">
                        Comenzar Evaluación
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                    <button className="btn-secondary" onClick={() => setIsVideoOpen(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="play-icon"><path d="M8 5v14l11-7z" /></svg>
                        Ver Video Demo
                    </button>
                </motion.div>

                <motion.div className="trusted-by" variants={itemVariants}>
                    <p>Confían en nosotros:</p>
                    <div className="logos-row">
                        <span className="logo-text">🏥 ClinicaSanJosé</span>
                        <span className="logo-text">🧠 NeuroKids</span>
                        <span className="logo-text">👨‍⚕️ PediatrasAsoc</span>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-image"
                style={{ rotateX, rotateY }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className="image-wrapper">
                    <div className="image-glow"></div>
                    <img
                        src="https://res.cloudinary.com/dilgq19i2/image/upload/v1769148382/fondohero_bcjvxp.png"
                        alt="Plataforma AutiSense detección temprana del TEA"
                    />
                </div>

                {/* Floating Cards with Glassmorphism */}
                <motion.div
                    className="floating-card card-top"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="card-icon check">✅</div>
                    <div className="card-content">
                        <span className="card-title">Análisis Listo</span>
                        <span className="card-subtitle">Reporte generado</span>
                    </div>
                </motion.div>

                <motion.div
                    className="floating-card card-bottom"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                >
                    <div className="card-icon chart">📊</div>
                    <div className="card-content">
                        <span className="card-title">Precisión Alta</span>
                        <span className="card-subtitle">95% de efectividad</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        className="video-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            className="video-modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-modal" onClick={() => setIsVideoOpen(false)}>×</button>
                            <div className="video-wrapper">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/3onwqSqd3cg?si=1u-l7921r7Q9_pmw"
                                    title="AutiSense Demo"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
