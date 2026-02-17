import { useEffect, useState } from "react";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle.jsx";
import AuthModal from "./AuthModal.jsx";

export default function Navbar({ user, setUser, isAuthOpen, setIsAuthOpen }) {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

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
        <>
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

                    {/* DERECHA */}
                    <div className="navbar-right">
                        {user ? (
                            <div className="user-menu">
                                <span className="user-name">Hola, {user.name.split(" ")[0]}</span>
                                <button className="nav-btn-outline" onClick={handleLogout}>
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <button className="nav-btn-primary" onClick={() => setIsAuthOpen(true)}>
                                Entrar
                            </button>
                        )}
                        <ThemeToggle />
                    </div>

                </div>
            </header>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onAuthSuccess={(userData) => setUser(userData)}
            />
        </>
    );
}
