import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroDashboard.css";

import DashboardView from "./mockups/DashboardView";
import PacientesView from "./mockups/PacientesView";
import ReportesView from "./mockups/ReportesView";
import AnalisisView from "./mockups/AnalisisView";

const slides = [
    { component: <DashboardView />, label: "Dashboard" },
    { component: <PacientesView />, label: "Pacientes" },
    { component: <ReportesView />, label: "Reportes" },
    { component: <AnalisisView />, label: "Análisis" }
];

export default function HeroDashboard() {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="dash-carousel">
            <button className="dash-arrow left" onClick={prev}>
                ‹
            </button>

            <div className="dash-slide-wrapper">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -80 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {slides[index].component}
                    </motion.div>
                </AnimatePresence>
            </div>

            <button className="dash-arrow right" onClick={next}>
                ›
            </button>

            {/* Indicadores */}
            <div className="dash-indicators">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`dash-dot-indicator ${i === index ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
}