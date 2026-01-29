import { circIn, motion } from "framer-motion";
import "./AboutAutisense.css";

/* =====================
   VARIANTS
===================== */
const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.15
        }
    }
};

const item = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.96
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: "easeOut"
        }
    }
};

const AboutAutisense = () => {
    return (
        <section className="features-section">
            <motion.div
                className="features-grid"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* CARD 1 */}
                <motion.div
                    className="feature-card"
                    variants={item}
                    whileHover={{ y: -70, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                    <motion.img
                        className="feature-image feature-image--main"
                        src="https://res.cloudinary.com/dilgq19i2/image/upload/v1769281682/Gemini_Generated_Image_awvy3awvy3awvy3a-removebg-preview2_dqpth5.png"
                        alt="Reportes de análisis"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.18, rotate: 1 }}
                    />


                    <div>
                        <h3>Reportes de Análisis</h3>
                        <p>
                            Informes detallados y visuales del análisis de
                            comportamiento, listos para exportar.
                        </p>
                    </div>
                </motion.div>

                {/* CARD 2 */}
                <motion.div
                    className="feature-card"
                    variants={item}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                    <motion.img
                        src="https://res.cloudinary.com/dilgq19i2/image/upload/v1769280228/Gemini_Generated_Image_ymqprpymqprpymqp-removebg-preview_v2jz3z.png"
                        alt="Evaluaciones clínicas"
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.08, rotate: -1 }}
                    />

                    <div>
                        <h3>Evaluaciones Clínicas</h3>
                        <p>
                            Documentación clínica rápida y precisa para
                            profesionales de la salud.
                        </p>
                    </div>
                </motion.div>

                {/* CARD 3 */}
                <motion.div
                    className="feature-card"
                    variants={item}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                    <motion.img
                        src="https://res.cloudinary.com/dilgq19i2/image/upload/v1769280228/Gemini_Generated_Image_knmfsyknmfsyknmf-removebg-preview_uwwwox.png"
                        alt="Seguimiento del desarrollo"
                        animate={{ y: [0, -9, 0] }}
                        transition={{
                            duration: 3.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.08 }}
                    />

                    <div>
                        <h3>Seguimiento del Desarrollo</h3>
                        <p>
                            Monitorea el progreso y los hitos del bebé a lo largo
                            del tiempo.
                        </p>
                    </div>
                </motion.div>

                {/* CARD 4 */}
                <motion.div
                    className="feature-card"
                    variants={item}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                    <motion.img
                        src="https://res.cloudinary.com/dilgq19i2/image/upload/v1769280228/Gemini_Generated_Image_dg8ezsdg8ezsdg8e-removebg-preview_ulnttw.png"
                        alt="Recursos para padres"
                        animate={{ y: [0, -11, 0] }}
                        transition={{
                            duration: 4.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.08 }}
                    />

                    <div>
                        <h3>Recursos para Padres</h3>
                        <p>
                            Acceso a guías y materiales confiables para acompañar
                            a las familias.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AboutAutisense;
