import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [tab, setTab] = useState("login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/register";

        try {
            console.log(`Intentando ${tab} en: http://localhost:5000${endpoint}`);
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error de autenticación:", data);
                throw new Error(data.message || "Credenciales incorrectas o error en el servidor");
            }

            console.log("Autenticación exitosa:", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            onAuthSuccess(data.user);
            onClose();
        } catch (err) {
            console.error("Error en el proceso de auth:", err);
            setError(err.message === "Failed to fetch" ? "No se pudo conectar con el servidor. ¿Está encendido?" : err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="auth-modal-overlay" onClick={onClose}>
                <motion.div
                    className="auth-modal-content"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${tab === "login" ? "active" : ""}`}
                            onClick={() => setTab("login")}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className={`auth-tab ${tab === "register" ? "active" : ""}`}
                            onClick={() => setTab("register")}
                        >
                            Registrarse
                        </button>
                    </div>

                    <div className="auth-body">
                        <div className="auth-header">
                            <h2>{tab === "login" ? "¡Bienvenido!" : "Crea tu cuenta"}</h2>
                            <p>
                                {tab === "login"
                                    ? "Accede a tu panel de control de AutiSense"
                                    : "Únete a la comunidad líder en detección temprana"}
                            </p>
                        </div>

                        {error && <div className="error-msg">{error}</div>}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {tab === "register" && (
                                <div className="input-group">
                                    <label>Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Juan Pérez"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            <div className="input-group">
                                <label>Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ejemplo@correo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? "Procesando..." : tab === "login" ? "Entrar" : "Crear cuenta"}
                            </button>
                        </form>

                        <div className="auth-footer">
                            {tab === "login" ? (
                                <p>¿No tienes cuenta? <span onClick={() => setTab("register")}>Regístrate aquí</span></p>
                            ) : (
                                <p>¿Ya tienes cuenta? <span onClick={() => setTab("login")}>Inicia sesión</span></p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
