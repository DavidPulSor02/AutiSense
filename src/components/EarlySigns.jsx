import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./EarlySigns.css";

const EarlySigns = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transforms for a subtler, cleaner 3D Reveal
    const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [30, 0, 0, -30]);
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.95, 1, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const SIGNS = [
        {
            title: "Contacto visual",
            text: "Dificultades para mantener la mirada o seguir objetos pueden ser señales tempranas.",
            icon: "https://res.cloudinary.com/dilgq19i2/image/upload/v1766022366/customer_eblkjz.png",
        },
        {
            title: "Movimientos repetitivos",
            text: "Conductas motoras repetitivas pueden indicar patrones tempranos a evaluar.",
            icon: "https://res.cloudinary.com/dilgq19i2/image/upload/v1766022354/10315357-removebg-preview_hlckpw.png",
        },
        {
            title: "Escasa atención",
            text: "Dificultad para mantener la atención en estímulos sociales o visuales.",
            icon: "https://res.cloudinary.com/dilgq19i2/image/upload/v1766022379/vision_vxaqti.png",
        }
    ];

    return (
        <section className="early-signs-clean" id="earlysings" ref={containerRef}>
            <motion.div
                className="signs-header-clean"
                style={{ opacity, scale }}
            >
                <h2 className="signs-title-clean">
                    Señales tempranas que <span>analizamos</span>
                </h2>
                <div className="title-divider-clean"></div>
            </motion.div>

            <div className="signs-grid-container-clean">
                <div className="signs-grid-clean">
                    {SIGNS.map((sign, index) => (
                        <motion.div
                            key={index}
                            className="sign-card-clean"
                            style={{
                                rotateX,
                                scale,
                                opacity,
                            }}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="sign-icon-box-clean">
                                <img src={sign.icon} alt={sign.title} />
                            </div>
                            <h3>{sign.title}</h3>
                            <p>{sign.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EarlySigns;
