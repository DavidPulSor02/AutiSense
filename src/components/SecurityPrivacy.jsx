import React from "react";
import { motion } from "framer-motion";
import { HiShieldCheck, HiLockClosed, HiCpuChip, HiDocumentCheck, HiCheckCircle } from "react-icons/hi2";
import "./SecurityPrivacy.css";

const FEATURES = [
    {
        title: "Almacenamiento seguro",
        text: "Los datos se protegen en entornos controlados con acceso restringido y auditorías periódicas.",
        icon: <HiShieldCheck />,
        tag: "ISO 27001"
    },
    {
        title: "Cifrado avanzado",
        text: "La información se cifra en tránsito y en reposo para reducir riesgos de exposición.",
        icon: <HiLockClosed />,
        tag: "AES-256"
    },
    {
        title: "IA ética",
        text: "Analizamos señales de apoyo sin identificar personas ni usar biometría o reconocimiento facial.",
        icon: <HiCpuChip />,
        tag: "Privacidad por diseño"
    },
    {
        title: "Cumplimiento normativo",
        text: "Diseñado para respaldar procesos con criterios de confidencialidad y buenas prácticas clínicas.",
        icon: <HiDocumentCheck />,
        tag: "HIPAA / GDPR"
    }
];

const TRUST_POINTS = [
    "Acceso restringido por rol y permisos",
    "Monitoreo continuo de integridad y actividad",
    "Minimización de datos y uso responsable",
    "Respaldo y recuperación de información"
];

const SecurityPrivacy = () => {
    return (
        <section className="security-evervault-section" id="security">
            <div className="security-shell">
                <motion.div
                    className="security-header-compact"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55 }}
                >
                    <p className="security-kicker">Privacidad y seguridad</p>
                    <h2>
                        Protección seria para <span>datos sensibles</span>
                    </h2>
                    <p>
                        AutiSense combina controles estrictos, trazabilidad y diseño responsable para que equipos clínicos y familias puedan confiar en cada interacción.
                    </p>
                </motion.div>

                <div className="security-layout">
                    <motion.article
                        className="security-main-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                    >
                        <div className="security-card-header">
                            <div className="security-icon-pill">
                                <HiShieldCheck size={22} />
                            </div>
                            <div>
                                <p className="security-card-label">Marco de confianza</p>
                                <h3>Seguridad por diseño, sin fricción innecesaria</h3>
                            </div>
                        </div>

                        <p className="security-card-copy">
                            Priorizamos la confidencialidad, la trazabilidad y la integridad de los datos desde la arquitectura hasta la operación diaria.
                        </p>

                        <div className="security-pill-row">
                            <span className="security-pill">Auditoría continua</span>
                            <span className="security-pill">Control de acceso</span>
                            <span className="security-pill">Privacidad por defecto</span>
                        </div>

                        <div className="security-stats-grid">
                            <div>
                                <strong>256-bit</strong>
                                <span>Cifrado</span>
                            </div>
                            <div>
                                <strong>24/7</strong>
                                <span>Monitoreo</span>
                            </div>
                            <div>
                                <strong>100%</strong>
                                <span>Responsable</span>
                            </div>
                        </div>

                        <div className="security-visual-band">
                            <div className="visual-line" />
                            <div className="visual-status">
                                <span className="status-dot" />
                                <p>Integridad del sistema estable y en observación continua.</p>
                            </div>
                        </div>
                    </motion.article>

                    <motion.aside
                        className="security-side-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                    >
                        <p className="security-card-label">Controles clave</p>
                        <ul className="trust-list">
                            {TRUST_POINTS.map((point) => (
                                <li key={point}>
                                    <HiCheckCircle size={18} />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.aside>
                </div>

                <div className="security-features-grid">
                    {FEATURES.map((feature, index) => (
                        <motion.article
                            className="security-feature-card"
                            key={feature.title}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                            whileHover={{ y: -4, scale: 1.01 }}
                        >
                            <div className="feature-icon-wrap">
                                {feature.icon}
                            </div>
                            <div className="feature-content">
                                <h4>{feature.title}</h4>
                                <p>{feature.text}</p>
                            </div>
                            <span className="feature-tag">{feature.tag}</span>
                        </motion.article>
                    ))}
                </div>

                <p className="evervault-footer">
                    Diseñado con principios de privacidad por defecto · Transparencia operativa · Cumplimiento continuo
                </p>
            </div>
        </section>
    );
};

export default SecurityPrivacy;
