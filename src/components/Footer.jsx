import { motion } from "framer-motion";
import "./Footer.css";
import { 
    FaGlobe, 
    FaFacebookF, 
    FaInstagram, 
    FaTwitter 
} from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* COLUMNA 1 */}
                <motion.div
                    className="footer-brand"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="logo">
                        <img src="https://res.cloudinary.com/dilgq19i2/image/upload/v1766022430/lOGO_hmvjtb.png" alt="Autisense Logo" />
                        <span>AutiSense</span>
                    </div>

                    <p>
                        Tecnología inteligente para la detección temprana
                        del desarrollo infantil.
                    </p>

                    <div className="newsletter">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                        />
                        <button>Enviar</button>
                    </div>
                </motion.div>

                {/* COLUMNA 2 */}
                <motion.div
                    className="footer-links"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <h4>Información</h4>
                    <ul>
                        <li>Sobre nosotros</li>
                        <li>Privacidad y seguridad</li>
                        <li>Planes de suscripción</li>
                        <li>Términos y condiciones</li>
                    </ul>
                </motion.div>

                {/* COLUMNA 3 */}
                <motion.div
                    className="footer-contact"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h4>Contáctanos</h4>

                    <p>contacto@autisense.ai</p>

                    <div className="socials">
                        <a href="#" aria-label="Sitio web">
                            <FaGlobe />
                        </a>
                        <a href="#" aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="Twitter / X">
                            <FaTwitter />
                        </a>
                    </div>
                </motion.div>


            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} AutiSense. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
