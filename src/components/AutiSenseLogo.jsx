import { motion } from "framer-motion";

export default function AutiSenseLogo({ size = 40, className = "" }) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial="hidden"
            animate="visible"
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Background Shape - Subtle Hexagon-ish Neural Node */}
            <motion.path
                d="M50 5 L85 25 V75 L50 95 L15 75 V25 Z"
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.15, pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Neural Pulse - The "Sensing" Wave */}
            <motion.path
                d="M25 50 C 35 50, 40 20, 50 50 C 60 80, 65 50, 75 50"
                stroke="url(#logo-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#logo-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            {/* Main AI Pulse Logic Nodes */}
            <motion.circle
                cx="50" cy="50" r="4"
                fill="url(#logo-gradient)"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.circle
                cx="25" cy="50" r="2.5"
                fill="#2563eb"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            />
            <motion.circle
                cx="75" cy="50" r="2.5"
                fill="#06b6d4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
            />
        </motion.svg>
    );
}
