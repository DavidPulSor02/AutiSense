import { motion } from "framer-motion";
import "./EarlySigns.css";

const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const EarlySigns = () => {
    return (
        <section className="earlysings" id="earlysings">
            <motion.h2
                className="signals-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Señales tempranas que <span>analizamos</span>
            </motion.h2>

            <div className="signals-grid">

                {/* CARD 1 */}
                <motion.div
                    className="signals-card"
                    variants={cardAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="signals-icon">
                        <img src="https://res.cloudinary.com/dilgq19i2/image/upload/v1766022366/customer_eblkjz.png" />
                    </div>
                    <h3>Contacto visual</h3>
                    <p>
                        Dificultades para mantener la mirada o seguir objetos
                        pueden ser señales tempranas.
                    </p>
                </motion.div>

                {/* CARD 2 */}
                <motion.div
                    className="signals-card"
                    variants={cardAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="signals-icon">
                        <img src="https://res.cloudinary.com/dilgq19i2/image/upload/v1766022354/10315357-removebg-preview_hlckpw.png" />
                    </div>
                    <h3>Movimientos repetitivos</h3>
                    <p>
                        Conductas motoras repetitivas pueden indicar
                        patrones tempranos a evaluar.
                    </p>
                </motion.div>

                {/* CARD 3 */}
                <motion.div
                    className="signals-card"
                    variants={cardAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="signals-icon">
                        <img src="https://res.cloudinary.com/dilgq19i2/image/upload/v1766022379/vision_vxaqti.png" />
                    </div>
                    <h3>Escasa atención</h3>
                    <p>
                        Dificultad para mantener la atención en estímulos
                        sociales o visuales.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default EarlySigns;
