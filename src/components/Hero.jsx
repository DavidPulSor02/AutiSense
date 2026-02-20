import "./Hero.css";
import HeroDashboard from "./HeroDashboard";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from "framer-motion";
import { useEffect, useState } from "react";
import {
    Rocket,
    Play,
    ArrowRight,
    X
} from "lucide-react";

export default function Hero() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [4, -4]);
    const rotateY = useTransform(x, [-50, 50], [-4, 4]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const offsetX = e.clientX - innerWidth / 2;
            const offsetY = e.clientY - innerHeight / 2;

            x.set(offsetX / 25);
            y.set(offsetY / 25);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    useEffect(() => {
        document.body.style.overflow = isVideoOpen ? "hidden" : "unset";
    }, [isVideoOpen]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section id="hero" className="hero">
            <div className="hero-bg-glow"></div>

            <div className="hero-inner">
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div className="badge-container" variants={itemVariants}>
                        <motion.span
                            className="badge-new"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Rocket size={16} style={{ marginRight: 6 }} />
                            Nuevo
                        </motion.span>
                        <span className="badge-text">
                            AutiSense 2.0 ya está aquí
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1 variants={itemVariants}>
                        Descubre el Potencial <br />
                        <span className="text-gradient">
                            Sin Límites
                        </span> de tu Hijo
                    </motion.h1>

                    {/* Description */}
                    <motion.p variants={itemVariants}>
                        La plataforma #1 impulsada por IA para la detección temprana
                        y acompañamiento del TEA. Tecnología que entiende,
                        apoya y conecta.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className="hero-actions"
                        variants={itemVariants}
                    >
                        <motion.button
                            className="btn-primary"
                            whileHover={{
                                scale: 1.05,
                                boxShadow:
                                    "0 10px 30px rgba(37, 99, 235, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Comenzar Evaluación
                            <ArrowRight size={18} />
                        </motion.button>

                        <motion.button
                            className="btn-secondary"
                            onClick={() => setIsVideoOpen(true)}
                            whileHover={{
                                scale: 1.05,
                                background:
                                    "rgba(255, 255, 255, 0.1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Play size={18} className="play-icon" />
                            Ver Video Demo
                        </motion.button>
                    </motion.div>

                    {/* Trusted */}
                    <motion.div
                        className="trusted-by"
                        variants={itemVariants}
                    >
                        <p>Confían en nosotros:</p>
                        <div className="logos-row">
                            <span className="logo-text">
                                Clínica San José
                            </span>
                            <span className="logo-text">
                                NeuroKids
                            </span>
                            <span className="logo-text">
                                Asociación Pediátrica
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Dashboard Mockup — dynamic, integrated */}
                <motion.div
                    className="hero-image"
                    style={{ rotateX, rotateY }}
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: 30
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                >
                    <div className="image-glow"></div>
                    <HeroDashboard />
                </motion.div>
            </div>

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
                            initial={{
                                scale: 0.8,
                                opacity: 0
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1
                            }}
                            exit={{
                                scale: 0.8,
                                opacity: 0
                            }}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >
                            <button
                                className="close-modal"
                                onClick={() =>
                                    setIsVideoOpen(false)
                                }
                            >
                                <X size={22} />
                            </button>

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