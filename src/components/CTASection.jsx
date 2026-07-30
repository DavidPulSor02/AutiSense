import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import "./CTASection.css";

const CTASection = () => {
    return (
        <section className="cta-section">
            <div className="cta-bg-orbs">
                <div className="cta-orb orb-1" />
                <div className="cta-orb orb-2" />
                <div className="cta-orb orb-3" />
            </div>

            <div className="cta-container">
                <motion.div
                    className="cta-badge"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Sparkles size={14} />
                    <span>Comienza hoy</span>
                </motion.div>

                <motion.h2
                    className="cta-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    ¿Listo para dar el <span>primer paso</span>?
                </motion.h2>

                <motion.p
                    className="cta-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Miles de familias ya confían en AutiSense para el desarrollo de sus hijos.
                    Únete y accede a herramientas diseñadas con inteligencia y corazón.
                </motion.p>

                <motion.div
                    className="cta-actions"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.button
                        className="cta-btn-primary"
                        onClick={() => window.location.href = "http://18.191.246.13/planes"}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 12px 35px rgba(94, 159, 163, 0.4)"
                        }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Comenzar Evaluación
                        <ArrowRight size={18} />
                    </motion.button>

                    <motion.a
                        href="#plans"
                        className="cta-btn-ghost"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Ver planes
                    </motion.a>
                </motion.div>

                <motion.p
                    className="cta-reassurance"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    ✓ Sin compromiso &nbsp;&nbsp; ✓ Datos protegidos &nbsp;&nbsp; ✓ Resultados en minutos
                </motion.p>
            </div>
        </section>
    );
};

export default CTASection;
