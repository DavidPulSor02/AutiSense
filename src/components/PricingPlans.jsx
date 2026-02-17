import { motion } from "framer-motion";
import { useState } from "react";
import "./PricingPlans.css";
import PaymentModal from "./PaymentModal";

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

const PricingPlans = ({ user, onAuthRequired }) => {
    const [billing, setBilling] = useState("monthly");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = {
        esencial: {
            name: "Esencial",
            price: 299,
            desc: "Ideal para padres que desean una detección preventiva temprana desde casa.",
            features: [
                "Evaluación inicial con IA",
                "Reporte básico de resultados",
                "Seguimiento general del desarrollo"
            ]
        },
        avanzado: {
            name: "Avanzado",
            price: 599,
            desc: "Seguimiento continuo y comparativo del desarrollo.",
            features: [
                "Evaluaciones periódicas con IA",
                "Reportes comparativos",
                "Alertas tempranas",
                "Historial de desarrollo"
            ],
            featured: true
        },
        profesional: {
            name: "Profesional",
            price: 999,
            desc: "Diseñado para clínicas y profesionales de la salud.",
            features: [
                "Análisis clínico avanzado",
                "Reportes exportables",
                "Seguimiento multi-paciente",
                "Acceso para especialistas"
            ]
        }
    };

    const getPriceValue = (basePrice) => {
        if (billing === "monthly") return basePrice;
        return Math.round(basePrice * 12 * 0.8); // -20% anual
    };

    const handleCheckout = (planKey) => {
        if (!user) {
            onAuthRequired();
            return;
        }

        const planData = plans[planKey];
        setSelectedPlan({
            name: planData.name,
            price: getPriceValue(planData.price)
        });
        setIsModalOpen(true);
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
                {Object.keys(plans).map((key, index) => {
                    const plan = plans[key];
                    const currentPrice = getPriceValue(plan.price);

                    return (
                        <motion.div
                            key={key}
                            className={`pricing-card ${plan.featured ? "featured" : ""}`}
                            variants={cardAnim}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={index}
                        >
                            {plan.featured && <div className="badge">Recomendado</div>}

                            <h3>{plan.name}</h3>

                            <div className="price">
                                ${currentPrice}
                                <span>{periodLabel}</span>
                            </div>

                            <ul>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>

                            <p className="plan-desc">{plan.desc}</p>

                            <button
                                className={`plan-btn ${plan.featured ? "primary" : ""}`}
                                onClick={() => handleCheckout(key)}
                            >
                                Comenzar
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* MODAL DE PAGO SIMULADO */}
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={selectedPlan?.name}
                price={selectedPlan?.price}
                period={periodLabel}
            />
        </section>
    );
};

export default PricingPlans;
