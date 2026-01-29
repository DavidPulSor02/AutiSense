import { motion } from "framer-motion";
import { useState } from "react";
import "./PricingPlans.css";

const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: i * 0.15
        }
    })
};

const PricingPlans = () => {
    const [billing, setBilling] = useState("monthly");

    const basePrices = {
        esencial: 299,
        avanzado: 599,
        profesional: 999
    };

    const getPrice = (price) => {
        if (billing === "monthly") return price;
        return Math.round(price * 12 * 0.8); // -20% anual
    };

    const periodLabel = billing === "monthly" ? "/ mes" : "/ año";

    return (
        <section className="pricingplans" id="pricingplans">
            <motion.h2
                className="pricing-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Planes de <span>suscripción</span>
            </motion.h2>

            {/* TOGGLE */}
            <div className="billing-toggle">
                <span className={billing === "monthly" ? "active" : ""}>
                    Mensual
                </span>

                <div
                    className={`toggle-switch ${billing}`}
                    onClick={() =>
                        setBilling(
                            billing === "monthly" ? "yearly" : "monthly"
                        )
                    }
                >
                    <motion.div
                        className="toggle-thumb"
                        animate={{
                            x: billing === "yearly" ? 24 : 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                        }}
                    />
                </div>

                <span className={billing === "yearly" ? "active" : ""}>
                    Anual <em>-20%</em>
                </span>
            </div>

            <div className="pricing-grid">

                {/* PLAN ESENCIAL */}
                <motion.div
                    className="pricing-card"
                    variants={cardAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                >
                    <h3>Esencial</h3>

                    <div className="price">
                        ${getPrice(basePrices.esencial)}
                        <span>{periodLabel}</span>
                    </div>

                    <ul>
                        <li>Evaluación inicial con IA</li>
                        <li>Reporte básico de resultados</li>
                        <li>Seguimiento general del desarrollo</li>
                    </ul>

                    <p className="plan-desc">
                        Ideal para padres que desean una detección preventiva
                        temprana desde casa.
                    </p>

                    <button className="plan-btn">Comenzar</button>
                </motion.div>

                {/* PLAN AVANZADO */}
                <motion.div
                    className="pricing-card featured"
                    variants={cardAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={1}
                >
                    <div className="badge">Recomendado</div>

                    <h3>Avanzado</h3>

                    <div className="price">
                        ${getPrice(basePrices.avanzado)}
                        <span>{periodLabel}</span>
                    </div>

                    <ul>
                        <li>Evaluaciones periódicas con IA</li>
                        <li>Reportes comparativos</li>
                        <li>Alertas tempranas</li>
                        <li>Historial de desarrollo</li>
                    </ul>

                    <p className="plan-desc">
                        Seguimiento continuo y comparativo del desarrollo.
                    </p>

                    <button className="plan-btn primary">
                        Comenzar ahora
                    </button>
                </motion.div>

                {/* PLAN PROFESIONAL */}
                <motion.div
                    className="pricing-card"
                    variants={cardAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={2}
                >
                    <h3>Profesional</h3>

                    <div className="price">
                        ${getPrice(basePrices.profesional)}
                        <span>{periodLabel}</span>
                    </div>

                    <ul>
                        <li>Análisis clínico avanzado</li>
                        <li>Reportes exportables</li>
                        <li>Seguimiento multi-paciente</li>
                        <li>Acceso para especialistas</li>
                    </ul>

                    <p className="plan-desc">
                        Diseñado para clínicas y profesionales de la salud.
                    </p>

                    <button className="plan-btn">Comenzar</button>
                </motion.div>

            </div>
        </section>
    );
};

export default PricingPlans;
