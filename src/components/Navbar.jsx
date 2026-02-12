import { useEffect, useState } from "react";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle.jsx";


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

    return (
        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-container">

                {/* IZQUIERDA */}
                <div className="navbar-left">
                    <a href="#hero" className="navbar-brand">
                        <span className="navbar-title">AutiSense</span>
                    </a>
                </div>

                {/* NAVEGACIÓN */}
                <nav className="navbar-center">
                    <a
                        href="#hero"
                        className={`nav-link ${active === "hero" ? "active" : ""}`}
                    >
                        Nosotros
                    </a>

                    <a
                        href="#earlysings"
                        className={`nav-link ${active === "earlysings" ? "active" : ""}`}
                    >
                        Señales
                    </a>

                    <a
                        href="#security"
                        className={`nav-link ${active === "security" ? "active" : ""}`}
                    >
                        Seguridad
                    </a>

                    <a
                        href="#pricingplans"
                        className={`nav-link ${active === "pricingplans" ? "active" : ""}`}
                    >
                        Planes
                    </a>

                    <a
                        href="#testimonials"
                        className={`nav-link ${active === "testimonials" ? "active" : ""}`}
                    >
                        Testimonios
                    </a>
                </nav>

                {/* THEME TOGGLE */}
                <div className="navbar-right">
                    <ThemeToggle />
                </div>

            </div>
        </header>
    );
}
