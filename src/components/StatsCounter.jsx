import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Users, Brain, ShieldCheck, Star } from "lucide-react";
import "./StatsCounter.css";

const STATS = [
    {
        icon: Users,
        value: 3000,
        suffix: "+",
        label: "Familias confían en nosotros",
        color: "#5E9FA3"
    },
    {
        icon: Brain,
        value: 95,
        suffix: "%",
        label: "Precisión en detección IA",
        color: "#4BD2E1"
    },
    {
        icon: ShieldCheck,
        value: 100,
        suffix: "%",
        label: "Datos cifrados y protegidos",
        color: "#9ECCD0"
    },
    {
        icon: Star,
        value: 4.9,
        suffix: "/5",
        label: "Calificación de usuarios",
        color: "#5E9FA3",
        isDecimal: true
    }
];

const useAnimatedCounter = (target, isInView, isDecimal = false) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current++;
            const progress = current / steps;
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = isDecimal
                ? Math.round(eased * target * 10) / 10
                : Math.round(eased * target);
            setCount(value);

            if (current >= steps) {
                setCount(target);
                clearInterval(timer);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, target, isDecimal]);

    return count;
};

const StatItem = ({ stat, index, isInView }) => {
    const Icon = stat.icon;
    const count = useAnimatedCounter(stat.value, isInView, stat.isDecimal);

    return (
        <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
            <div className="stat-icon-wrapper" style={{ background: `${stat.color}15` }}>
                <Icon size={26} color={stat.color} />
            </div>

            <div className="stat-value">
                {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}
                <span className="stat-suffix">{stat.suffix}</span>
            </div>

            <p className="stat-label-text">{stat.label}</p>
        </motion.div>
    );

};

const StatsCounter = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="stats-section" id="stats" ref={ref}>
            <div className="stats-glass-bg" />

            <motion.div
                className="stats-header-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="stats-title">
                    Impacto que <span>transforma</span> vidas
                </h2>
                <p className="stats-subtitle">
                    Números que reflejan nuestro compromiso con las familias y profesionales.
                </p>
            </motion.div>

            <div className="stats-grid">
                {STATS.map((stat, index) => (
                    <StatItem
                        key={stat.label}
                        stat={stat}
                        index={index}
                        isInView={isInView}
                    />
                ))}
            </div>
        </section>
    );
};

export default StatsCounter;
