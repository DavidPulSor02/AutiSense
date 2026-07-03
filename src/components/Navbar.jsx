import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle.jsx";
import AutiSenseLogo from "./AutiSenseLogo.jsx";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 900) {
                setMobileMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { id: "hero", label: "Inicio" },
        { id: "signals", label: "Señales" },
        { id: "team", label: "Equipo" },
        { id: "security", label: "Seguridad" },
        { id: "plans", label: "Planes" },
        { id: "testimonials", label: "Testimonios" },
        { id: "contact", label: "Contacto", external: true }
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
                                href={link.external ? `/${link.id}` : `#${link.id}`}
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
                        <button
                            type="button"
                            className="navbar-mobile-toggle"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </motion.div>

                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="mobile-menu-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="mobile-menu-panel"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 220, damping: 24 }}
                        >
                            <div className="mobile-menu-header">
                                <span className="navbar-title mobile-menu-title">AutiSense</span>
                                <button
                                    type="button"
                                    className="navbar-mobile-toggle mobile-menu-close"
                                    onClick={() => setMobileMenuOpen(false)}
                                    aria-label="Cerrar menú"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="mobile-menu-links">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.external ? `/${link.id}` : `#${link.id}`}
                                        className={`mobile-nav-link ${active === link.id ? "active" : ""}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </>
    );
}
