import "./Hero.css";
import heroImage from "../assets/hero-image.png";
import {
    motion,
    useMotionValue,
    useTransform
} from "framer-motion";
import { useEffect } from "react";
import {
    Rocket,
    ArrowRight
} from "lucide-react";

export default function Hero() {

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
                        Plataforma Inteligente <br />
                        <span className="text-gradient">
                            Deteccion
                        </span> Temprana del TEA
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
                            onClick={() => window.location.href = "http://18.191.246.13/planes"}
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

                {/* Image Mockup — static, premium */}
                <motion.div
                    className="hero-image"
                    style={{ rotateX, rotateY }}
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 40
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
                </motion.div>
            </div>


        </section>
    );
}