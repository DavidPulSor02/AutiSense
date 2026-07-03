import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./PrivacyPage.css";

const PrivacyPage = () => {
    return (
        <main className="privacy-page">
            <motion.div
                className="privacy-hero"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Link to="/" className="privacy-back">
                    ← Volver al inicio
                </Link>
                <p className="privacy-kicker">Política de privacidad</p>
                <h1>Privacidad y seguridad en AutiSense</h1>
                <p className="privacy-intro">
                    Este documento describe cómo tratamos la información sensible, los controles de seguridad que aplicamos y tus derechos como usuario.
                </p>
            </motion.div>

            <section className="privacy-content">
                <article className="privacy-card">
                    <h2>Datos que recolectamos</h2>
                    <p>
                        Recopilamos solo la información necesaria para ofrecer diagnósticos y seguimiento clínico. Incluye datos de contacto, resultados de evaluaciones y metadata de uso para optimizar la experiencia.
                    </p>
                </article>

                <article className="privacy-card">
                    <h2>Uso responsable</h2>
                    <p>
                        La información se utiliza exclusivamente para apoyar el cuidado, coordinar citas y mejorar las recomendaciones. No vendemos datos a terceros y mantenemos auditoría continua de acceso.
                    </p>
                </article>

                <article className="privacy-card">
                    <h2>Seguridad técnica</h2>
                    <p>
                        Protegemos los datos con cifrado en tránsito y en reposo, controles de acceso por rol, y verificación continua para detectar comportamientos atípicos.
                    </p>
                </article>

                <article className="privacy-card">
                    <h2>Tus derechos</h2>
                    <p>
                        Puedes solicitar acceso, rectificación o eliminación de tus datos. También tienes derecho a comprender qué información se guarda y con qué propósito.
                    </p>
                </article>

                <article className="privacy-card privacy-action-card">
                    <h2>Transparencia y confianza</h2>
                    <p>
                        AutiSense combina principios éticos y tecnología avanzada para que el manejo de datos sea claro, seguro y útil para profesionales y familias.
                    </p>
                    <Link to="/" className="privacy-action-link">
                        Regresar   
                    </Link>
                </article>
            </section>
        </main>
    );
};

export default PrivacyPage;
    