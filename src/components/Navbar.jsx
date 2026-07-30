import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle.jsx";
import AutiSenseLogo from "./AutiSenseLogo.jsx";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);

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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

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

    const mobileMenuVariants = {
        hidden: { opacity: 0, x: "100%" },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.07,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            x: "100%",
            transition: { duration: 0.25, ease: "easeIn" }
        }
    };

    const mobileLinkVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 30 }
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

                    {/* NAVEGACIÓN DESKTOP */}
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
                        {/* Hamburger Button */}
                        <button
                            className={`hamburger-btn ${mobileOpen ? "open" : ""}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Abrir menú de navegación"
                        >
                            <span className="hamburger-line" />
                            <span className="hamburger-line" />
                            <span className="hamburger-line" />
                        </button>
                    </motion.div>

                </div>
            </motion.header>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            className="mobile-menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.nav
                            className="mobile-menu"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="mobile-menu-header">
                                <AutiSenseLogo size={36} />
                                <span className="navbar-title">AutiSense</span>
                            </div>

                            <div className="mobile-menu-links">
                                {navLinks.map((link) => (
                                    <motion.a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        className={`mobile-nav-link ${active === link.id ? "active" : ""}`}
                                        variants={mobileLinkVariants}
                                        onClick={() => setMobileOpen(false)}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {link.label}
                                        {active === link.id && (
                                            <motion.span
                                                className="mobile-active-dot"
                                                layoutId="mobile-active"
                                            />
                                        )}
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mobile-menu-footer">
                                <ThemeToggle />
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
