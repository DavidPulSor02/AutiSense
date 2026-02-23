import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://landingautisense.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (como herramientas de servidor o móviles)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'El CORS de este sitio no permite acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        timestamp: new Date()
    });
});

// Database connection and server start
const startServer = async () => {
    try {
        console.log("Intentando conectar a MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a MongoDB con éxito");

        app.listen(PORT, () => {
            console.log(`Servidor de AutiSense ejecutándose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

startServer();