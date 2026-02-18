import { motion } from "framer-motion";

export default function ChatToggleIcon({ isOpen }) {
    return (
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyItems: "center" }}>
            <motion.svg
                viewBox="0 0 100 100"
                style={{ width: "100%", height: "100%", overflow: "visible" }}
                initial="initial"
                animate="animate"
            >
                <defs>
                    <radialGradient id="sphere-grad" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#1e40af" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Path for orbiting text */}
                    <path id="textPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                </defs>

                {/* Orbiting Text Ring */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "50px", originY: "50px" }}
                >
                    <text fill="var(--brand-primary)" fontSize="9" fontWeight="bold" letterSpacing="2">
                        <textPath href="#textPath" startOffset="0%">
                            AUTISENSE • AUTISENSE •
                        </textPath>
                    </text>
                </motion.g>

                {/* The Sphere */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="22"
                    fill="url(#sphere-grad)"
                    filter="url(#glow)"
                    animate={isOpen ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Inner Icon (Pulse) */}
                <motion.path
                    d="M 40 50 L 45 50 L 48 40 L 52 60 L 55 50 L 60 50"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={isOpen ? { opacity: 0 } : { pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />

                {/* Close Icon (X) - Appears when open */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.g
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <line x1="38" y1="38" x2="62" y2="62" stroke="white" strokeWidth="4" strokeLinecap="round" />
                            <line x1="62" y1="38" x2="38" y2="62" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        </motion.g>
                    )}
                </AnimatePresence>
            </motion.svg>
        </div>
    );
}

// Ensure AnimatePresence is available for internal component logic
import { AnimatePresence } from "framer-motion";
