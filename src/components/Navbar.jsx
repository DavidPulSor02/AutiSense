import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle.jsx";
import AutiSenseLogo from "./AutiSenseLogo.jsx";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        const sections = document.querySelectorAll("section");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-50% 0px -50% 0px"
            }
        );

        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { id: "hero", label: "Nosotros" },
        { id: "signals", label: "Señales" },
        { id: "security", label: "Seguridad" },
        { id: "plans", label: "Planes" },
        { id: "testimonials", label: "Testimonios" }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <motion.header
                className={`navbar ${scrolled ? "scrolled" : ""}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="navbar-container">

                    {/* IZQUIERDA */}
                    <motion.div className="navbar-left" variants={linkVariants}>
                        <a href="#hero" className="navbar-brand">
                            <AutiSenseLogo size={scrolled ? 34 : 42} />
                            <span className="navbar-title">AutiSense</span>
                        </a>
                    </motion.div>

                    {/* NAVEGACIÓN */}
                    <nav className="navbar-center">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.id}
                                href={`#${link.id}`}
                                className={`nav-link ${active === link.id ? "active" : ""}`}
                                variants={linkVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </nav>

                    {/* DERECHA */}
                    <motion.div className="navbar-right" variants={linkVariants}>
                        <ThemeToggle />
                    </motion.div>

                </div>
            </motion.header>

        </>
    );
}
