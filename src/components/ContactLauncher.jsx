import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import "./ContactLauncher.css";

export default function ContactLauncher() {
    const navigate = useNavigate();

    return (
        <motion.button
            className="contact-launcher"
            aria-label="Contactar a AutiSense"
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
        >
            <div className="launcher-icon">
                <Mail size={24} />
            </div>
            <span>Contacto</span>
        </motion.button>
    );
}
