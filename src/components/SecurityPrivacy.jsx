import { motion } from "framer-motion";
import { HiShieldCheck, HiLockClosed, HiCpuChip, HiDocumentCheck } from "react-icons/hi2";
import "./SecurityPrivacy.css";

const containerAnim = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const SecurityPrivacy = () => {
    return (
        <section id="security" className="security-section">
            <motion.h2
                className="security-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Seguridad y <span>privacidad</span>
            </motion.h2>

            <motion.div
                className="security-grid"
                variants={containerAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >

                <motion.div className="security-card" variants={cardAnim}>
                    <div className="security-icon"><HiShieldCheck /></div>
                    <h3>Almacenamiento seguro</h3>
                    <p>
                        Infraestructura certificada con estándares ISO 27001,
                        SOC 2 y buenas prácticas en resguardo de información sensible.
                    </p>
                </motion.div>

                <motion.div className="security-card" variants={cardAnim}>
                    <div className="security-icon"><HiLockClosed /></div>
                    <h3>Cifrado avanzado</h3>
                    <p>
                        Los videos y datos se cifran de extremo a extremo durante
                        la carga, análisis y almacenamiento.
                    </p>
                </motion.div>

                <motion.div className="security-card" variants={cardAnim}>
                    <div className="security-icon"><HiCpuChip /></div>
                    <h3>IA ética y no invasiva</h3>
                    <p>
                        Analiza conductas, no identidades. Sin reconocimiento
                        facial ni biometría.
                    </p>
                </motion.div>

                <motion.div className="security-card" variants={cardAnim}>
                    <div className="security-icon"><HiDocumentCheck /></div>
                    <h3>Cumplimiento normativo</h3>
                    <p>
                        Cumple con HIPAA, Ley Federal de Protección de Datos
                        (México) y normativas sobre datos infantiles.
                    </p>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default SecurityPrivacy;
