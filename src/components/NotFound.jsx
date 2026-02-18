import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./NotFound.css";

export default function NotFound() {
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [gameOver, setGameOver] = useState(false);
    const [gameWin, setGameWin] = useState(false);
    const [score, setScore] = useState(0);

    const PADDLE_HEIGHT = 10;
    const PADDLE_WIDTH = 100;
    const BALL_RADIUS = 8;
    const BRICK_ROWS = 4;
    const BRICK_COLS = 8;
    const BRICK_PADDING = 10;
    const BRICK_OFFSET_TOP = 50;
    const BRICK_OFFSET_LEFT = 30;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Internal Game State
        let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
        let ballX = canvas.width / 2;
        let ballY = canvas.height - 100;
        let dx = 4;
        let dy = -4;

        const bricks = [];
        for (let c = 0; c < BRICK_COLS; c++) {
            bricks[c] = [];
            for (let r = 0; r < BRICK_ROWS; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - PADDLE_WIDTH / 2;
            }
        };

        const drawBall = () => {
            ctx.beginPath();
            ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = "#3b82f6";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#3b82f6";
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;
        };

        const drawPaddle = () => {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT - 10, PADDLE_WIDTH, PADDLE_HEIGHT);
            ctx.fillStyle = "#06b6d4";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#06b6d4";
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;
        };

        const drawBricks = () => {
            const brickWidth = (canvas.width - (BRICK_OFFSET_LEFT * 2) - (BRICK_COLS * BRICK_PADDING)) / BRICK_COLS;
            const brickHeight = 25;

            for (let c = 0; c < BRICK_COLS; c++) {
                for (let r = 0; r < BRICK_ROWS; r++) {
                    if (bricks[c][r].status === 1) {
                        const brickX = c * (brickWidth + BRICK_PADDING) + BRICK_OFFSET_LEFT;
                        const brickY = r * (brickHeight + BRICK_PADDING) + BRICK_OFFSET_TOP;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;

                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = r % 2 === 0 ? "rgba(59, 130, 246, 0.4)" : "rgba(6, 182, 212, 0.4)";
                        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        };

        const collisionDetection = () => {
            const brickWidth = (canvas.width - (BRICK_OFFSET_LEFT * 2) - (BRICK_COLS * BRICK_PADDING)) / BRICK_COLS;
            const brickHeight = 25;
            let totalBricks = BRICK_ROWS * BRICK_COLS;
            let destroyedCount = 0;

            for (let c = 0; c < BRICK_COLS; c++) {
                for (let r = 0; r < BRICK_ROWS; r++) {
                    const b = bricks[c][r];
                    if (b.status === 1) {
                        if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            setScore(prev => prev + 10);
                        }
                    } else {
                        destroyedCount++;
                    }
                }
            }

            if (destroyedCount === totalBricks) {
                setGameWin(true);
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();

            // Walls
            if (ballX + dx > canvas.width - BALL_RADIUS || ballX + dx < BALL_RADIUS) {
                dx = -dx;
            }
            if (ballY + dy < BALL_RADIUS) {
                dy = -dy;
            } else if (ballY + dy > canvas.height - BALL_RADIUS - 10) {
                if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
                    dy = -dy;
                    dx = 8 * ((ballX - (paddleX + PADDLE_WIDTH / 2)) / PADDLE_WIDTH);
                } else if (ballY + dy > canvas.height) {
                    setGameOver(true);
                    return;
                }
            }

            ballX += dx;
            ballY += dy;
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("mousemove", handleMouseMove);
        draw();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const resetGame = () => {
        window.location.reload();
    };

    return (
        <div className="game-404-container">
            <div className="game-header">
                <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }}>404: ERROR DE CONEXIÓN</motion.h1>
                <p>Repara la red neuronal para volver al inicio</p>
                <div className="score-badge">Puntos: {score}</div>
            </div>

            <canvas
                ref={canvasRef}
                width={window.innerWidth > 800 ? 800 : window.innerWidth - 40}
                height={500}
                className="game-canvas"
            />

            <AnimatePresence>
                {(gameOver || gameWin) && (
                    <motion.div
                        className="game-overlay"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {gameWin ? (
                            <>
                                <h2>¡CONEXIÓN RESTAURADA! 🧠</h2>
                                <p>Has liberado el camino de vuelta.</p>
                                <button className="back-btn" onClick={() => navigate("/")}>
                                    Regresar al Inicio
                                </button>
                            </>
                        ) : (
                            <>
                                <h2>RED BLOQUEADA ❌</h2>
                                <p>El error 404 ha ganado esta vez.</p>
                                <button className="retry-btn" onClick={resetGame}>
                                    Reintentar
                                </button>
                                <button className="skip-btn" onClick={() => navigate("/")}>
                                    Volver de todos modos
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
