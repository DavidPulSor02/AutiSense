import { motion } from "framer-motion";

export default function ScrollReveal({
    children,
    variant = "fadeIn",
    delay = 0,
    duration = 0.5,
    className = ""
}) {
    const variants = {
        fadeIn: {
            hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" }
        },
        slideUp: {
            hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" }
        },
        slideLeft: {
            hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
            visible: { opacity: 1, x: 0, filter: "blur(0px)" }
        },
        slideRight: {
            hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
            visible: { opacity: 1, x: 0, filter: "blur(0px)" }
        },
        revealFromBottom: {
            hidden: { opacity: 0, y: 90, scale: 0.96, filter: "blur(8px)" },
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                    type: "spring",
                    stiffness: 60,
                    damping: 20
                }
            }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
            visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
    };

    return (
        <motion.div
            variants={variants[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
