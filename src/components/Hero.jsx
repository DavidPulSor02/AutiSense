import "./Hero.css";
import heroImage from "../assets/hero-image.png";
import {
    motion,
    useMotionValue,
    useTransform
} from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Rocket,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Brain
} from "lucide-react";

export default function Hero() {
    const navigate = useNavigate();
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
            <motion.div
                className="hero-ambient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                aria-hidden="true"
            >
                <span className="ambient-orb orb-one" />
                <span className="ambient-orb orb-two" />
                <span className="ambient-orb orb-three" />
            </motion.div>

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
                        Impulsando vidas
                        <span className="text-gradient"> con atención médica transformadora</span>
                    </motion.h1>

                    <motion.p variants={itemVariants}>
                        Nuestra misión es empoderar al personal médico con datos precisos, procesos más rápidos y
                        una experiencia digital clara que mejora el resultado del paciente.
                    </motion.p>

                    <motion.div className="hero-highlights" variants={itemVariants}>
                        <motion.div className="highlight-pill" whileHover={{ y: -2, scale: 1.02 }}>
                            <Sparkles size={14} />
                            <span>IA clínica</span>
                        </motion.div>
                        <motion.div className="highlight-pill" whileHover={{ y: -2, scale: 1.02 }}>
                            <ShieldCheck size={14} />
                            <span>Seguridad</span>
                        </motion.div>
                        <motion.div className="highlight-pill" whileHover={{ y: -2, scale: 1.02 }}>
                            <Brain size={14} />
                            <span>Atención integral</span>
                        </motion.div>
                    </motion.div>

                    <motion.div className="hero-actions" variants={itemVariants}>
                        <motion.button
                            className="btn-primary"
                            onClick={() => navigate('/contact')}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 30px rgba(37, 99, 235, 0.25)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Solicitar consulta
                            <ArrowRight size={18} />
                        </motion.button>

                        <motion.button
                            className="btn-secondary"
                            onClick={() => navigate('/contact')}
                            whileHover={{
                                scale: 1.05,
                                background: "rgba(255, 255, 255, 0.92)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Chat con nosotros
                        </motion.button>
                    </motion.div>

                    <motion.div className="hero-metrics" variants={itemVariants}>
                        <div className="metric-card">
                            <strong>38+</strong>
                            <p>expertos médicos</p>
                        </div>
                        <div className="metric-card">
                            <strong>20+</strong>
                            <p>casos clínicos</p>
                        </div>
                    </motion.div>

                    <motion.a href="#showcase" className="hero-scroll-hint" variants={itemVariants}>
                        Explora la plataforma
                        <ArrowRight size={16} />
                    </motion.a>

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

                <motion.div
                    className="hero-image"
                    style={{ rotateX, rotateY }}
                    whileHover={{ scale: 1.01, y: -8, transition: { duration: 0.3 } }}
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
                        duration: 1.2,
                        delay: 0.4,
                        ease: [0.25, 1, 0.5, 1]
                    }}
                >
                    <div className="image-glow"></div>
                    <img src={heroImage} alt="AutiSense Premium Experience" className="premium-hero-img" />
                    <div className="hero-callout top-right">
                        <span>38+ médicos expertos</span>
                    </div>
                    <div className="hero-callout bottom-left">
                        <span>20+ logros médicos</span>
                    </div>
                    <div className="hero-card-overlay">
                        <strong>Dr. Ana López</strong>
                        <span>Especialista en desarrollo infantil</span>
                        <button onClick={() => navigate('/contact')}>Agendar cita</button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}