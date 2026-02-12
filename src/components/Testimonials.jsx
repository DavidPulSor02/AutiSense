import { motion } from "framer-motion";
import "./Testimonials.css";

const testimonials = [
    {
        name: "María González",
        role: "Madre de familia",
        text: "Gracias a la plataforma pudimos detectar señales tempranas en nuestro hijo. El proceso fue claro, humano y nos dio mucha tranquilidad.",
        avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
        name: "Dr. Luis Hernández",
        role: "Pediatra especialista",
        text: "Es una herramienta bien diseñada. Analiza conductas relevantes sin invadir la privacidad, algo fundamental en salud infantil.",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        name: "Ana Sofía Romero",
        role: "Madre de familia",
        text: "La interfaz es muy sencilla y los reportes nos ayudaron a tomar decisiones informadas desde casa.",
        avatar: "https://i.pravatar.cc/150?img=47"
    }
];

const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: "easeOut"
        }
    })
};

const Testimonials = () => {
    return (
        <section id="testimonials" className="testimonials-section">
            <motion.h2
                className="testimonials-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Lo que dicen <span>familias y especialistas</span>
            </motion.h2>

            <div className="testimonials-grid">
                {testimonials.map((item, i) => (
                    <motion.div
                        key={i}
                        className="testimonial-card"
                        variants={cardAnim}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{ y: -10 }}
                        viewport={{ once: true }}
                        custom={i}
                    >
                        <p className="testimonial-text">
                            “{item.text}”
                        </p>

                        <div className="testimonial-user">
                            <img src={item.avatar} alt={item.name} />
                            <div>
                                <strong>{item.name}</strong>
                                <span>{item.role}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
