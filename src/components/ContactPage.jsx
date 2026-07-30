import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "./ContactPage.css";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        organizacion: "",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        telefono: "",
        email: "",
        mensaje: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Contacto enviado:", formData);

        alert(
            "Gracias. Hemos recibido tu solicitud y te contactaremos pronto."
        );
    };

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <p className="eyebrow">Contacto profesional</p>

                    <h1>Atención directa para tu equipo médico</h1>

                    <p>
                        Completa el formulario y un consultor especializado de
                        AutiSense se comunicará contigo.
                    </p>

                    <div className="contact-highlights">
                        <div>
                            <Mail size={20} />
                            <p>Respuesta en menos de 24 horas</p>
                        </div>

                        <div>
                            <Phone size={20} />
                            <p>Soporte médico confiable</p>
                        </div>

                        <div>
                            <MapPin size={20} />
                            <p>Asesoría para tu institución</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-form-section">
                <motion.div
                    className="contact-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Cuéntanos más sobre tu caso</h2>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            Institución u organización

                            <input
                                type="text"
                                name="organizacion"
                                value={formData.organizacion}
                                onChange={handleChange}
                                placeholder="Nombre de tu institución o empresa"
                                required
                            />
                        </label>

                        <div className="row-grid">
                            <label>
                                Nombre(s)

                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu nombre"
                                    required
                                />
                            </label>

                            <label>
                                Apellido paterno

                                <input
                                    type="text"
                                    name="apellidoPaterno"
                                    value={formData.apellidoPaterno}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu apellido paterno"
                                    required
                                />
                            </label>
                        </div>

                        <div className="row-grid">
                            <label>
                                Apellido materno

                                <input
                                    type="text"
                                    name="apellidoMaterno"
                                    value={formData.apellidoMaterno}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu apellido materno"
                                />
                            </label>

                            <label>
                                Teléfono de contacto

                                <input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu teléfono"
                                    required
                                />
                            </label>
                        </div>

                        <label>
                            Correo electrónico

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu correo electrónico"
                                required
                            />
                        </label>

                        <label>
                            Comentarios o pregunta

                            <textarea
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                placeholder="Escribe tu consulta o solicitud"
                                rows="5"
                            />
                        </label>

                        <div className="contact-actions">
                            <Link to="/" className="privacy-action-link">
                                Regresar
                            </Link>

                            <button type="submit" className="btn-primary">
                                Enviar solicitud
                            </button>
                        </div>
                    </form>
                </motion.div>
            </section>
        </main>
    );
}